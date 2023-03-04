import { forwardRef, useId } from 'react';
import type { RadioProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
	const {
		wrapperClassName,
		labelClassName,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('radio');

	const id = rest.id || useId();

	return (
		<span className={ $(`${ prefixCls }-wrapper`, wrapperClassName) }>
			<input
				{ ...rest }
				id={ id }
				type="radio"
				className={ $(prefixCls, rest.className) }
				ref={ ref }
			/>
			<label htmlFor={ id } className={ $(`${ prefixCls }-label`, labelClassName) }>
				{ children }
			</label>
		</span>
	);
});

export { Radio };
