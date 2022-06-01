import { forwardRef } from 'react';
import type { ButtonProps } from './interface';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
	const {
		icon,
		suffix,
		type,
		dashed,
		htmlType = 'button',
		...rest
	} = props;

	const { prefixCls } = useConfigProvider();

	const hasChildren = !!props.children;

	return (
		<button
			tabIndex={ 0 }
			role="button"
			{ ...rest }
			className={ classNames(prefixCls + '-btn', {
				[`${prefixCls}-btn-${type}`]: (!!type && type !== 'default'),
				[`${prefixCls}-btn-icon-only`]: !hasChildren,
				[`${prefixCls}-btn-dashed`]: !!dashed,
			}) }
			type={ htmlType }
			ref={ ref }
		>
			{ icon }
			{ hasChildren ? (
				<span>{ props.children }</span>
			) : null }
			{ suffix }
		</button>
	);
});

export { Button };
