import type { KeyboardEvent, MouseEvent } from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { default as Selector } from '../../icons/Selector';
import { clamp, classNames, contains, getKey, isHTMLElement, isNullable, Key } from '../../utils';
import { Overlay } from '../overlay';
import { useRenumProvider } from '../renum-provider';
import type { SelectOption, SelectProps } from './interface';
import { Clear } from '../clear';
import { ARIA_DISABLED, ARIA_SELECTED, Direction, NOT, OptionState } from './helpers';

const SELECTOR_ICON = <Selector />;

const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
	const {
		name,
		placeholder,
		value: $value,
		options,
		onChange,
		clearable = true,
		placement,
		...rest
	} = props;

	const id = props.id || useId();
	const buttonId = id + '-button';
	const labelId = id + '-label';
	const listId = id + '-list';

	const [expanded, setExpanded] = useState<boolean>(false);
	const [selected, setSelected] = useState<number | undefined>();

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const listboxRef = useRef<HTMLUListElement | null>(null);

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('select');

	function close() {
		const btn = buttonRef.current;
		const ul = listboxRef.current;

		if (btn) {
			btn.focus();
		}

		setExpanded(false);

		if (!isHTMLElement(ul)) {
			return;
		}

		const lis = [...ul.querySelectorAll<HTMLLIElement>(`li${ NOT(ARIA_DISABLED) }.${ prefixCls }-option-hover`)];

		for (const li of lis) {
			li.classList.remove(`${ prefixCls }-option-hover`);
		}
	}

	function open(focus: boolean = false) {
		if (expanded) {
			return;
		}

		setExpanded(true);

		if (focus) {
			setHover();
		}
	}

	function getLis(type: OptionState.Hovered | OptionState.Selected): HTMLLIElement | null
	function getLis(type: OptionState.None | OptionState.Disabled | OptionState.All): HTMLLIElement[]
	function getLis(type: OptionState = OptionState.None): (HTMLLIElement | null) | HTMLLIElement[] {
		const list = listboxRef.current;

		if (!list) {
			return [];
		}

		let selector = 'li';

		switch (type) {
			case OptionState.None:
				selector += NOT(ARIA_DISABLED);
				break;
			case OptionState.Hovered:
				selector += `${ NOT(ARIA_DISABLED) }.${ prefixCls }-option-hover`;
				return list.querySelector<HTMLLIElement>(selector);
			case OptionState.Selected:
				selector += ARIA_SELECTED + NOT(ARIA_DISABLED);
				return list.querySelector<HTMLLIElement>(selector);
			case OptionState.Disabled:
				selector += ARIA_DISABLED;
				break;
		}

		return [...list.querySelectorAll<HTMLLIElement>(selector)];
	}

	function setHover(direction?: Direction, hovered?: HTMLLIElement) {
		const ul = listboxRef.current;

		if (!isHTMLElement(ul)) {
			return;
		}

		const lis = getLis(OptionState.None);
		const hoveredOption = hovered ?? getLis(OptionState.Hovered);
		const selectedOption = getLis(OptionState.Selected);

		let index = -1;

		if (!hoveredOption && selectedOption) {
			index = lis.indexOf(selectedOption);
		} else if (hoveredOption) {
			index = lis.indexOf(hoveredOption);
		}

		switch (direction) {
			case Direction.Start:
			case Direction.End:
				index = (direction === Direction.Start) ? 0 : lis.length - 1;
				break;
			default:
				if (direction === undefined) {
					index = Math.max(index, 0);
				} else {
					index = clamp(index + direction, 0, lis.length - 1);
				}
				break;
		}

		const option = lis?.[index];

		if (!isHTMLElement(option)) {
			return;
		}

		hoveredOption?.classList?.remove?.(`${ prefixCls }-option-hover`);

		ul.setAttribute('aria-activedescendant', option.id);

		option.focus();
		option.classList.add(`${ prefixCls }-option-hover`);
	}

	function move(e: KeyboardEvent<HTMLButtonElement> | KeyboardEvent<HTMLLIElement>, normalized: Key) {
		switch (normalized) {
			case Key.Home:
			case Key.End:
				e.preventDefault();
				open();
				setHover((normalized === Key.Home) ? Direction.Start : Direction.End);
				break;
			case Key.PageUp:
			case Key.PageDown:
				e.preventDefault();
				open();
				setHover((normalized === Key.PageUp) ? Direction.Prev10 : Direction.Next10);
				break;
			case Key.Up:
			case Key.Right:
			case Key.Down:
			case Key.Left:
				e.preventDefault();
				open();
				setHover((normalized === Key.Up || normalized === Key.Left) ? Direction.Prev : Direction.Next);
				break;
		}
	}

	function handleOutsideClick(e: Event) {
		if (!contains(e.target, [buttonRef.current, listboxRef.current])) {
			close();
		}
	}

	function handleListFocusIn() {
		const lis = getLis(OptionState.None);

		for (const li of lis) {
			li.setAttribute('tabindex', '-1');
		}
	}

	function handleListFocusOut() {
		const lis = getLis(OptionState.None);

		for (const li of lis) {
			li.setAttribute('tabindex', '0');
		}
	}

	function handleButtonClick() {
		if (expanded) {
			close();
		} else {
			open();
		}
	}

	function handleLiClick(option: SelectOption) {
		return function (e: MouseEvent<HTMLLIElement>) {
			const li = e.target;

			if (!isHTMLElement(li)) {
				return;
			}

			const disabled = li.getAttribute('aria-disabled');

			if (isNullable(disabled) || disabled === 'true') {
				return;
			}

			setSelected(options.indexOf(option));
			close();
		};
	}

	function handleButtonKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
		const normalized = getKey(e.key);

		switch (normalized) {
			case Key.Escape:
				e.preventDefault();
				close();
				return;
			case Key.Space:
			case Key.Enter:
				e.preventDefault();
				open(true);
				return;
			case Key.Clear:
			case Key.Delete:
			case Key.Backspace:
				if (clearable) {
					setSelected(undefined);
				}
				return;
		}

		move(e, normalized);
	}

	function handleLiKeyDown(e: KeyboardEvent<HTMLLIElement>) {
		const normalized = getKey(e.key);
		const target = e.target;

		switch (normalized) {
			case Key.Escape:
				close();
				return;
			case Key.Space:
			case Key.Enter:
				e.preventDefault();

				if (isHTMLElement(target)) {
					target.click();
				}

				return;
		}

		move(e, normalized);
	}

	function renderOption(option: SelectOption, index: number) {
		return (
			<li
				key={ index }
				id={ id + '-option-' + index }
				role="option"
				aria-label={ option?.ariaLabel }
				aria-selected={ (selected === options.indexOf(option)) }
				aria-disabled={ option?.disabled ?? false }
				tabIndex={ option.disabled ? -1 : 0 }
				onKeyDown={ handleLiKeyDown }
				onClick={ handleLiClick(option) }
				className={ prefixCls + '-option' }
				data-value={ option.value }
			>
				{ option?.icon }
				<span>{ option.label }</span>
			</li>
		);
	}

	function renderList() {
		return (
			<ul
				ref={ listboxRef }
				id={ listId }
				role="listbox"
				aria-labelledby={ labelId }
				aria-multiselectable={ false }
				className={ prefixCls + '-list' }
				tabIndex={ -1 }
			>
				{ options.map(renderOption) }
			</ul>
		);
	}

	function renderBtnText() {
		let label: string | number | undefined = placeholder;

		if (selected !== undefined) {
			label = options.at(selected)?.label;
		}

		return (
			<span
				aria-label={ selected ? options.at(selected)?.ariaLabel : undefined }
				className={ classNames(prefixCls + '-text', {
					[`${ prefixCls }-placeholder`]: selected === undefined,
				}) }
			>
				{ label }
			</span>
		);
	}

	useEffect(function () {
		const listbox = listboxRef.current;

		if (expanded) {
			window.addEventListener('click', handleOutsideClick);

			if (listbox) {
				listbox.addEventListener('focusin', handleListFocusIn);
				listbox.addEventListener('focusout', handleListFocusOut);
			}
		}

		return function () {
			window.removeEventListener('click', handleOutsideClick);

			if (listbox) {
				listbox.removeEventListener('focusin', handleListFocusIn);
				listbox.removeEventListener('focusout', handleListFocusOut);
			}
		};
	}, [expanded]);

	return (
		<Overlay
			portalClassName={ `${ prefixCls }-portal` }
			className={ prefixCls + '-wrapper' }
			content={ renderList() }
			hidden={ !expanded }
			align={ placement }
		>
			<input
				type="hidden"
				name={ name }
				value={ selected ? options.at(selected)?.value : '' }
				hidden
			/>
			<button
				{ ...rest }
				id={ buttonId }
				type="button"
				role="button"
				aria-haspopup="listbox"
				aria-expanded={ expanded }
				onClick={ handleButtonClick }
				onKeyDown={ handleButtonKeyDown }
				className={ classNames(prefixCls, rest.className) }
				ref={ function (node) {
					buttonRef.current = node;

					if (typeof ref === 'function') {
						ref(node);
					} else if (ref) {
						ref.current = node;
					}
				} }
			>
				{ (selected === undefined) ? null : (
					options.at(selected)?.icon
				) }
				{ renderBtnText() }
				{ SELECTOR_ICON }
			</button>
			{ clearable ? (
				<Clear
					className={ prefixCls + '-clear' }
					hidden={ (selected === undefined) }
					onClick={ function () {
						return setSelected(undefined);
					} }
				/>
			) : null }
		</Overlay>
	);
});

export { Select };

