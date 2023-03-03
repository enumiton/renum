import type { MouseEvent, UIEvent } from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { default as Selector } from '../../icons/Selector';
import { $, clamp, contains, duplicateRef, isHTMLElement, Key, NOT } from '../../utils';
import { Overlay } from '../overlay';
import { useRenumProvider } from '../renum-provider';
import type { SelectOption, SelectProps } from './interface';
import { Clear } from '../clear';
import type { ListboxValue } from '../listbox';
import { useKeyDownListener } from '../../hooks';
import { InternalListbox } from '../listbox/internal.js';
import { findOptionByValue } from './helpers.js';
import {
	addFocusClassToOption,
	getFocusedOptionElement,
	getOptionElements,
	getSelectedOptionElement,
	removeFocusClassOfOption,
	SELECTOR_DISABLED,
} from '../listbox/helpers.js';

const SELECTOR_ICON = <Selector />;

const enum Direction {
	Next = +1,
	Prev = -1,
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
	const {
		name,
		placeholder,
		value: _value,
		defaultValue,
		options,
		onChange,
		clearable = true,
		placement = 'bottom-start',
		wrapperClassName,
		wrapperStyle,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('select');

	const [expanded, setExpanded] = useState<boolean>(false);
	const [selected, setSelected] = useState<SelectOption | undefined>(findOptionByValue(options, defaultValue));

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const listboxRef = useRef<HTMLUListElement | null>(null);

	const id = props.id || useId();
	const buttonId = id + '-button';
	const listboxId = id + '-list';

	function close() {
		const listbox = listboxRef.current;
		const activeElement = window.document.activeElement;

		if (isHTMLElement(listbox)) {
			removeFocusClassOfOption(getFocusedOptionElement(listbox));

			if (listbox.contains(activeElement)) {
				buttonRef.current?.focus();
			}
		}

		setExpanded(false);
	}

	function open() {
		setExpanded(true);
	}

	function toggle() {
		if (expanded) {
			close();
		} else {
			open();
		}
	}

	function clear() {
		if (clearable) {
			setSelected(undefined);
			buttonRef.current?.focus();
		}
	}

	function move(direction: Direction) {
		return function () {
			const listbox = listboxRef.current;
			const button = buttonRef.current;

			if (!isHTMLElement(listbox) || !isHTMLElement(button)) {
				return;
			}

			if (!expanded) {
				open();
			}

			const focused = getFocusedOptionElement(listbox) ?? getSelectedOptionElement(listbox);
			const options = getOptionElements(listbox, NOT(SELECTOR_DISABLED));

			removeFocusClassOfOption(focused);

			let option: HTMLLIElement | undefined;

			const index = options.findIndex(function (option) {
				return (option === focused);
			});

			option = options.at(clamp(index + direction, 0, options.length - 1));

			if (!option) {
				return;
			}

			const [min, max] = [option.offsetTop - option.clientHeight, option.offsetTop + option.clientHeight];

			if (!(min > listbox.scrollTop && max < (listbox.scrollTop + listbox.clientHeight))) {
				listbox.scrollTo({
					top: (direction === Direction.Next) ? option.offsetTop - listbox.clientHeight + (option.clientHeight * 2) : min,
					behavior: 'auto',
				});
			}

			addFocusClassToOption(option);
			button.setAttribute('aria-activedescendant', option?.id ?? '');

			option?.click();
		};
	}

	function handleListboxChange(value: ListboxValue, e: UIEvent<HTMLElement>) {
		const option = options.find(function (v) {
			return (v.value === value);
		});

		setSelected(option);

		// temp: Only close when selecting with mouse
		if (e.detail !== 0) {
			close();
		}
	}

	function handleOutsideClick(e: Event) {
		if (!contains(e.target, [buttonRef.current, listboxRef.current])) {
			close();
		}
	}

	function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
		if (expanded) {
			close();
		} else {
			open();
		}

		props?.onClick?.(e);
	}

	useKeyDownListener(buttonRef, {
		[Key.Up]: move(Direction.Prev),
		[Key.Down]: move(Direction.Next),
		[Key.Space]: toggle,
		[Key.Enter]: toggle,
		[Key.Escape]: close,
		[Key.Clear]: clear,
		[Key.Delete]: clear,
		[Key.Backspace]: clear,
	}, { preventDefault: true, stopPropagation: true });

	useEffect(function () {
		if (expanded) {
			window.addEventListener('click', handleOutsideClick, { passive: true });
		}

		return function () {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, [expanded]);

	useEffect(function () {
		if (_value !== selected?.value) {
			setSelected(findOptionByValue(options, _value));
		}
	}, [_value]);

	useEffect(function () {
		onChange?.(selected?.value);
	}, [selected?.value]);

	return (
		<Overlay
			setWidth
			portalClassName={ `${ prefixCls }-portal` }
			className={ $(`${ prefixCls }-wrapper`, wrapperClassName) }
			style={ wrapperStyle }
			hidden={ !expanded }
			align={ placement }
			content={ (
				<InternalListbox
					ref={ listboxRef }
					id={ listboxId }
					tabIndex={ -1 }
					value={ selected?.value }
					options={ options }
					onChange={ handleListboxChange }
					className={ `${ prefixCls }-listbox` }
				/>
			) }
		>
			<input
				type="hidden"
				name={ name }
				value={ selected?.value ?? '' }
				hidden
			/>
			<button
				{ ...rest }
				id={ buttonId }
				type="button"
				role="combobox"
				aria-haspopup="listbox"
				aria-owns={ listboxId }
				aria-controls={ expanded ? listboxId : undefined }
				aria-expanded={ expanded }
				onClick={ handleButtonClick }
				className={ $(prefixCls, rest.className) }
				ref={ duplicateRef(buttonRef, ref) }
			>
				{ selected?.icon }
				<span
					aria-label={ selected?.ariaLabel }
					className={ $(`${ prefixCls }-text`, {
						[`${ prefixCls }-placeholder`]: (!selected),
					}) }
				>
					{ selected?.label ?? placeholder }
				</span>
				{ SELECTOR_ICON }
			</button>
			{ clearable ? (
				<Clear
					className={ `${ prefixCls }-clear` }
					hidden={ (selected === undefined) }
					onClick={ clear }
				/>
			) : null }
		</Overlay>
	);
});

export { Select };

