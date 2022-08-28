import { forwardRef } from 'react';
import type { CheckboxProps } from './interface';
import { useConfigProvider } from '../renum-provider';
import { classNames } from '../../utils';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function (props, ref) {
	const {
		label,
		disabled,
		wrapperClassName,
		labelClassName,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('checkbox');

	return (
		<label className={ classNames(`${ prefixCls }-wrapper`, wrapperClassName) }>
			<input
				{ ...rest }
				disabled={ disabled }
				type="checkbox"
				className={ classNames(prefixCls, rest.className) }
				ref={ ref }
			/>
			<span className={ classNames(`${ prefixCls }-label`, labelClassName) }>
				{ label || children }
			</span>
		</label>
	);
});

export { Checkbox };
