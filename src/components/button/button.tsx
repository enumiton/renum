import { forwardRef } from 'react';
import type { MouseEvent } from 'react';
import type { ButtonProps } from './interface';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
	const {
		icon,
		suffix,
		type,
		shape,
		dashed,
		loading,
		block,
		htmlType = 'button',
		...rest
	} = props;

	const { prefixCls } = useConfigProvider();

	const hasChildren = !!props.children;

	function handleClick(e: MouseEvent<HTMLButtonElement>) {
		if (props.disabled) {
			return;
		}

		props?.onClick?.(e);
	}

	return (
		<button
			tabIndex={ 0 }
			role="button"
			{ ...rest }
			onClick={ handleClick }
			className={ classNames(prefixCls + '-btn', {
				[`${prefixCls}-btn-${type}`]: (!!type && type !== 'default'),
				[`${prefixCls}-btn-${shape}`]: (!!shape && shape !== 'default'),
				[`${prefixCls}-btn-icon-only`]: !hasChildren,
				[`${prefixCls}-btn-icon`]: !!icon,
				[`${prefixCls}-btn-suffix`]: !!suffix,
				[`${prefixCls}-btn-loading`]: (!!loading),
				[`${prefixCls}-btn-block`]: (!!block),
				[`${prefixCls}-btn-dashed`]: !!dashed,
			}, props.className) }
			type={ htmlType }
			ref={ ref }
		>
			{ icon }
			{ hasChildren ? (
				<span className={ prefixCls + '-btn-text' }>{ props.children }</span>
			) : null }
			{ suffix }
		</button>
	);
});

export { Button };
