import type { ChangeEvent } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import type { SwitchProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $, isHTMLInputElement } from '../../utils';

/**
 * @note Provide the switch with a label through `aria-label` or `aria-labelledby`
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
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

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const target = e.target;

		if (!isHTMLInputElement(target) || disabled) {
			return;
		}

		const next = target.checked;

		setValue(next);

		onChange?.(next, e);
	}

	useEffect(function () {
		if (_value !== undefined && _value !== value) {
			setValue(Boolean(_value));
		}
	}, [_value]);

	return (
		<input
			{ ...rest }
			type="checkbox"
			role="switch"
			checked={ value }
			aria-checked={ value }
			disabled={ disabled }
			aria-disabled={ disabled }
			className={ $(prefixCls, rest.className) }
			onChange={ handleChange }
			ref={ ref }
		/>
	);
});

export { Switch };
