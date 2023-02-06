import type { KeyboardEvent } from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { ListboxProps, ListboxValue } from './interface';
import { Option } from './option';
import { OptionGroup } from './group';
import { useRenumProvider } from '../renum-provider';
import { classNames, getKey, isHTMLElement, Key } from '../../utils';
import { cancelEvents, focusIn, focusOut, move } from './helper';

const Listbox = forwardRef<HTMLUListElement, ListboxProps>(function Listbox(props, ref) {
	const {
		options,
		onChange,
		defaultValue,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('listbox');

	const [value, setValue] = useState<ListboxValue>(defaultValue);

	const listboxRef = useRef<HTMLUListElement | null>(null);

	function handleChange(next: ListboxValue) {
		if (next === value) {
			return;
		}

		setValue(next);

		onChange?.(next);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLUListElement>) {
		const key = getKey(e.key);

		if (!isHTMLElement(listboxRef.current)) {
			return;
		}

		switch (key) {
			case Key.Down:
			case Key.Right:
				cancelEvents(e);
				move(listboxRef.current, 'next');
				break;
			case Key.Up:
			case Key.Left:
				cancelEvents(e);
				move(listboxRef.current, 'prev');
				break;
			case Key.Home:
				cancelEvents(e);
				move(listboxRef.current, 'first');
				break;
			case Key.End:
				cancelEvents(e);
				move(listboxRef.current, 'last');
				break;
		}
	}

	function handleFocusIn(e: FocusEvent) {
		const listbox = listboxRef.current;

		if (!isHTMLElement(listbox)) {
			return;
		}

		focusIn(listbox, e);
	}

	function handleFocusOut(e: FocusEvent) {
		const listbox = listboxRef.current;

		if (!isHTMLElement(listbox)) {
			return;
		}

		focusOut(listbox, e);
	}

	useEffect(function () {
		const listbox = listboxRef.current;

		if (!isHTMLElement(listbox)) {
			return;
		}

		listbox.addEventListener('focusin', handleFocusIn, { passive: true });
		listbox.addEventListener('focusout', handleFocusOut, { passive: true });

		return function () {
			listbox.removeEventListener('focusin', handleFocusIn);
			listbox.removeEventListener('focusout', handleFocusOut);
		};
	}, [!!listboxRef.current]);

	return (
		<ul
			{ ...rest }
			role="listbox"
			aria-orientation="vertical"
			aria-multiselectable="false"
			onKeyDown={ handleKeyDown }
			className={ classNames(prefixCls, rest.className) }
			ref={ function (node) {
				listboxRef.current = node;

				if (typeof ref === 'function') {
					ref?.(node);
				} else if (ref) {
					ref.current = node;
				}
			} }
		>
			{ options.map(function (option, i) {
				if ('options' in option) {
					return (
						<OptionGroup
							{ ...option }
							selected={ value }
							onChange={ handleChange }
							key={ i }
						/>
					);
				} else {
					return (
						<Option
							{ ...option }
							isSelected={ (value === option.value) }
							onChange={ handleChange }
							key={ i }
						/>
					);
				}
			}) }
		</ul>
	);
});

export { Listbox };
