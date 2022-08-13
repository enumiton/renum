import { forwardRef } from 'react';
import type { RadioProps } from './interface';
import { useConfigProvider } from '../renum-provider';
import { classNames } from '../../utils';

const Radio = forwardRef<HTMLInputElement, RadioProps>(function (props, ref) {
	const {
		label,
		disabled,
		...rest
	} = props;

	const { getPrefixCls } = useConfigProvider();
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
				{ label }
			</span>
		</label>
	);
});

export { Radio };
