import { forwardRef } from 'react';
import type { RadioProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { classNames } from '../../utils';

const Radio = forwardRef<HTMLInputElement, RadioProps>(function (props, ref) {
	const {
		disabled,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('radio');

	return (
		<label className={ classNames(`${ prefixCls }-wrapper`, rest.wrapperClassName) }>
			<input
				{ ...rest }
				type="radio"
				disabled={ disabled }
				className={ classNames(prefixCls, rest.className) }
				ref={ ref }
			/>
			<span className={ `${ prefixCls }-label` }>
				{ children }
			</span>
		</label>
	);
});

export { Radio };
