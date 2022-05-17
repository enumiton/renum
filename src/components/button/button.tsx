import { forwardRef } from 'react';
import type { ButtonProps } from './interface';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
	const {
		icon,
		suffix,
		htmlType = 'button',
		...rest
	} = props;

	const { prefixCls } = useConfigProvider();

	return (
		<button
			tabIndex={ 0 }
			role="button"
			{ ...rest }
			className={ classNames(prefixCls + '-btn', {
				'test': Math.random() > 0.5,
			}) }
			type={ htmlType }
			ref={ ref }
		>
			{ icon }
			{ props.children }
			{ suffix }
		</button>
	);
});

export { Button };
