import type { KeyboardEvent, MouseEvent } from 'react';
import { forwardRef, useId } from 'react';
import type { OptionProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { classNames, getKey, Key } from '../../utils';

const Option = forwardRef<HTMLLIElement, OptionProps>(function ListboxOption(props, ref) {
	const {
		label,
		value,
		disabled,
		onChange,
		isSelected,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('listbox-option');

	const id = rest.id || useId();

	function handleClick(_e: MouseEvent<HTMLLIElement>) {
		onChange?.(value);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLLIElement>) {
		const key = getKey(e.key);

		if (key === Key.Space) {
			e.preventDefault();
			e.stopPropagation();

			onChange?.(value);
		}
	}

	return (
		<li
			{ ...rest }
			id={ id }
			tabIndex={ 0 }
			role="option"
			aria-selected={ isSelected }
			aria-disabled={ disabled }
			onClick={ handleClick }
			onKeyDown={ handleKeyDown }
			className={ classNames(prefixCls, rest.className) }
			ref={ ref }
		>
			{ props.label }
		</li>
	);
});

export { Option };
