import type { ForwardRefExoticComponent, MouseEvent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { ButtonProps } from './interface';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import { Loading } from '../loading';
import { Group } from './group';

interface Button extends ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>> {
	Group: typeof Group;
}

const Button: Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
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

	const { getPrefixCls } = useConfigProvider();

	const prefixCls = getPrefixCls('btn');

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
			className={ classNames(prefixCls, {
				[`${ prefixCls }-${ type }`]: (!!type && type !== 'default'),
				[`${ prefixCls }-${ shape }`]: (!!shape && shape !== 'default'),
				[`${ prefixCls }-icon-only`]: !props.children,
				[`${ prefixCls }-icon`]: !!icon,
				[`${ prefixCls }-suffix`]: !!suffix,
				[`${ prefixCls }-loading`]: (!!loading),
				[`${ prefixCls }-block`]: (!!block),
				[`${ prefixCls }-dashed`]: !!dashed,
			}, props.className) }
			type={ htmlType }
			ref={ ref }
		>
			{ loading ? <Loading active /> : icon }
			{ (!!props.children) ? (
				<span className={ prefixCls + '-text' }>{ props.children }</span>
			) : null }
			{ suffix }
		</button>
	);
}) as Button;

Button.Group = Group;

export { Button };
