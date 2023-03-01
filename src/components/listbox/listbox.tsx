import type { FocusEvent, KeyboardEvent, UIEvent } from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { ListboxProps, ListboxValue } from './interface';
import { duplicateRef, isHTMLElement, isNonNullable, Key } from '../../utils';
import { useKeyDownListener } from '../../hooks';
import { InternalListbox } from './internal';
import {
	findOptionByChar,
	getFocusedOptionElement,
	getOptionElements,
	getSelectedOptionElement,
	move,
	removeFocusClassOfOption,
	setSelectedOnOption,
} from './helpers';

const Listbox = forwardRef<HTMLUListElement, ListboxProps>(function Listbox(props, ref) {
	const {
		value: _value,
		defaultValue,
		options,
		onChange,
		disabled,
		multiSelectable,
		...rest
	} = props;

	const [value, setValue] = useState<ListboxValue>(defaultValue);

	const listboxRef = useRef<HTMLUListElement | null>(null);

	const id = props.id || useId();

	function handleChange(next: ListboxValue, e: UIEvent<HTMLElement>) {
		if (disabled || next === value) {
			return;
		}

		const listbox = listboxRef.current;
		const target = e.currentTarget;

		if (!isHTMLElement(listbox) || !isHTMLElement(target)) {
			return;
		}

		setSelectedOnOption(getSelectedOptionElement(listbox), false);
		setSelectedOnOption(target, true);

		listbox.setAttribute('aria-activedescendant', target.id);

		setValue(next);

		onChange?.(next, e);
	}

	function setValueByFocused(listbox: HTMLUListElement | null | undefined) {
		listbox ??= listboxRef.current;

		if (!isHTMLElement(listbox)) {
			return;
		}

		const focused = getFocusedOptionElement(listbox);

		if (isNonNullable(focused)) {
			setSelectedOnOption(getSelectedOptionElement(listbox), false);
			setSelectedOnOption(focused, true);
		}
	}

	function handleKeyDown(e: KeyboardEvent<HTMLUListElement>) {
		if (e.key.length === 1 || e.key !== ' ') {
			const listbox = listboxRef.current;

			if (!isHTMLElement(listbox)) {
				return;
			}

			findOptionByChar(listbox, e.key);
		}

		rest?.onKeyDown?.(e);
	}

	function handleBlur(e: FocusEvent<HTMLUListElement>) {
		const listbox = listboxRef.current;

		if (!isHTMLElement(listbox)) {
			return;
		}

		for (const option of getOptionElements(listbox)) {
			removeFocusClassOfOption(option);
		}

		rest?.onBlur?.(e);
	}

	useKeyDownListener(listboxRef, {
		[Key.Up]: (_, listbox) => listbox.setAttribute('aria-activedescendant', move(listbox, 'prev') ?? ''),
		[Key.Down]: (_, listbox) => listbox.setAttribute('aria-activedescendant', move(listbox, 'next') ?? ''),
		[Key.Home]: (_, listbox) => listbox.setAttribute('aria-activedescendant', move(listbox, 'first') ?? ''),
		[Key.End]: (_, listbox) => listbox.setAttribute('aria-activedescendant', move(listbox, 'last') ?? ''),
		[Key.Space]: (_, listbox) => setValueByFocused(listbox),
		[Key.Enter]: (_, listbox) => setValueByFocused(listbox),
	}, { preventDefault: true, stopPropagation: true });

	useEffect(function () {
		setValue(_value);
	}, [_value]);

	return (
		<InternalListbox
			{ ...rest }
			value={ value }
			options={ options }
			id={ id }
			disabled={ disabled }
			tabIndex={ 0 }
			aria-orientation="vertical"
			aria-multiselectable={ multiSelectable }
			onKeyDown={ handleKeyDown }
			onBlur={ handleBlur }
			onChange={ handleChange }
			ref={ duplicateRef(listboxRef, ref) }
		/>
	);
});

export { Listbox };
