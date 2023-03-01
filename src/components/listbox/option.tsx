import type { MouseEvent } from 'react';
import { forwardRef, useId } from 'react';
import type { OptionProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { classNames } from '../../utils';

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

	function handleClick(e: MouseEvent<HTMLLIElement>) {
		if (!disabled) {
			onChange?.(value, e);
		}

		rest?.onClick?.(e);
	}

	return (
		<li
			{ ...rest }
			id={ id }
			role="option"
			aria-selected={ isSelected }
			aria-disabled={ disabled }
			onClick={ handleClick }
			className={ classNames(prefixCls, rest.className) }
			ref={ ref }
		>
			{ props.label }
		</li>
	);
});

export { Option };
