import type { MouseEvent } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import type { SwitchProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

/**
 * @note Provide the switch with a label through `aria-label` or `aria-labelledby`
 */
const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(props, ref) {
	const {
		defaultValue,
		value: _value,
		disabled,
		onChange,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('switch');

	const [value, setValue] = useState(Boolean(defaultValue));

	function toggle() {
		if (!disabled) {
			setValue(function (prev) {
				return !prev;
			});
		}
	}

	function handleClick(e: MouseEvent<HTMLButtonElement>) {
		toggle();

		rest?.onClick?.(e);
	}

	useEffect(function () {
		if (_value !== undefined) {
			setValue(Boolean(_value));
		}
	}, [_value]);

	useEffect(function () {
		onChange?.(value);
	}, [value]);

	return (
		<button
			{ ...rest }
			role="switch"
			aria-checked={ value }
			aria-disabled={ disabled }
			className={ $(prefixCls, rest.className) }
			onClick={ handleClick }
			ref={ ref }
		/>
	);
});

export { Switch };
