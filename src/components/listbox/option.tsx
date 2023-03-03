import type { KeyboardEvent, MouseEvent } from 'react';
import { forwardRef, useId } from 'react';
import type { OptionProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $, getKey, Key } from '../../utils';

const Option = forwardRef<HTMLLIElement, OptionProps>(function ListboxOption(props, ref) {
	const {
		label,
		icon,
		value,
		disabled,
		onChange,
		isSelected,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('listbox-option');

	const id = rest.id || useId();

	function change(e: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) {
		if (!disabled) {
			onChange?.(value, e);
		}
	}

	function handleClick(e: MouseEvent<HTMLLIElement>) {
		change(e);

		rest?.onClick?.(e);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLLIElement>) {
		const key = getKey(e.key);

		if (key === Key.Enter || key === Key.Space) {
			change(e);

			rest?.onKeyDown?.(e);
		}
	}

	return (
		<li
			{ ...rest }
			id={ id }
			role="option"
			aria-selected={ isSelected }
			aria-disabled={ disabled }
			onClick={ handleClick }
			onKeyDown={ handleKeyDown }
			className={ $(prefixCls, rest.className) }
			ref={ ref }
		>
			{ icon }
			{ label }
		</li>
	);
});

export { Option };
