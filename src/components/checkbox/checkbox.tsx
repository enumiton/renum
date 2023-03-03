import { forwardRef, useId } from 'react';
import type { CheckboxProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

// @todo intermediate state
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
	const {
		wrapperClassName,
		labelClassName,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('checkbox');

	const id = rest.id || useId();

	return (
		<span className={ $(`${ prefixCls }-wrapper`, wrapperClassName) }>
			<input
				{ ...rest }
				id={ id }
				type="checkbox"
				className={ $(prefixCls, rest.className) }
				ref={ ref }
			/>
			<label htmlFor={ id } className={ $(`${ prefixCls }-label`, labelClassName) }>
				{ children }
			</label>
		</span>
	);
});

export { Checkbox };
