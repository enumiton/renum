import type { KeyboardEvent, MouseEvent, MutableRefObject } from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { default as Selector } from '../../icons/Selector'; // Unsafe?
import { clamp, classNames, contains, getKey, isHTMLElement, isNullable, Key } from '../../utils';
import { Overlay } from '../overlay';
import { useConfigProvider } from '../renum-provider';
import type { SelectOption, SelectProps } from './interface';

const SELECTOR_ICON = <Selector />;

const ARIA_SELECTED = '[aria-selected="true"]';
const ARIA_DISABLED = '[aria-disabled="true"]';

function NOT(selector: string): string {
	return ':not(' + selector + ')';
}

const enum Direction {
	Next = +1,
	Next10 = +10,
	Prev = -1,
	Prev10 = -10,
	Start = 2,
	End = 3,
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(function (props, ref) {
	const {
		placeholder,
		value: $value,
		options,
		onChange,
		...rest
	} = props;

	const id = props.id || useId();
	const buttonId = id + '-button';
	const labelId = id + '-label';
	const listId = id + '-list';

	const [expanded, setExpanded] = useState<boolean>(false);
	const [selected, setSelected] = useState<number | undefined>();

	const buttonRef = useRef<HTMLButtonElement>(null);
	const listboxRef = useRef<HTMLUListElement>(null);

	const { getPrefixCls } = useConfigProvider();
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

	function setHover(direction?: Direction, hovered?: HTMLLIElement) {
		const ul = listboxRef.current;

		if (!isHTMLElement(ul)) {
			return;
		}

		const lis = [...ul.querySelectorAll('li' + NOT(ARIA_DISABLED))];
		const hoveredOption = hovered ?? ul.querySelector(`li${ NOT(ARIA_DISABLED) }.${ prefixCls }-option-hover`);
		const selectedOption = ul.querySelector('li' + ARIA_SELECTED + NOT(ARIA_DISABLED));

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
				setSelected(undefined);
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
				tabIndex={ -1 }
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
			>
				{ options.map(renderOption) }
			</ul>
		);
	}

	function renderBtnText() {
		let label: string | number | undefined = placeholder;

		if (selected !== undefined) {
			label = options?.[selected]?.label;
		}

		return (
			<span
				aria-label={ selected ? options?.[selected]?.ariaLabel : undefined }
				className={ classNames(prefixCls + '-text', {
					[`${ prefixCls }-placeholder`]: selected === undefined,
				}) }
			>
				{ label }
			</span>
		);
	}

	useEffect(function () {
		if (expanded) {
			window.addEventListener('click', handleOutsideClick);
		}

		return function () {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, [expanded]);

	return (
		<Overlay
			className={ prefixCls + '-wrapper' }
			content={ renderList() }
			hidden={ !expanded }
		>
			<button
				{ ...rest }
				ref={ function (node) {
					(buttonRef as MutableRefObject<HTMLButtonElement | null>).current = node;

					if (typeof ref === 'function') {
						ref(node);
					} else if (ref) {
						ref.current = node;
					}
				} }
				id={ buttonId }
				type="button"
				role="button"
				aria-haspopup="listbox"
				aria-expanded={ expanded }
				onClick={ handleButtonClick }
				onKeyDown={ handleButtonKeyDown }
				className={ classNames(prefixCls, rest.className) }
			>
				{ (selected === undefined) ? null : (
					options?.[selected]?.icon
				) }
				{ renderBtnText() }
				{ SELECTOR_ICON }
			</button>
		</Overlay>
	);
});

export { Select };

