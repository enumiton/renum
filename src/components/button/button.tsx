import type { ForwardRefExoticComponent, MouseEvent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { ButtonProps } from './interface';
import { $, isNonNullable } from '../../utils';
import { useRenumProvider } from '../renum-provider';
import { Loading } from '../loading';
import { Group } from './group';

interface Button extends ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>> {
	Group: typeof Group;
}

const Button: Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
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

	const { getPrefixCls } = useRenumProvider();

	const prefixCls = getPrefixCls('btn');

	function handleClick(e: MouseEvent<HTMLButtonElement>) {
		if (props?.disabled || loading) {
			return;
		}

		rest?.onClick?.(e);
	}

	return (
		<button
			tabIndex={ 0 }
			role="button"
			{ ...rest }
			onClick={ handleClick }
			className={ $(prefixCls, {
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
			{ isNonNullable(props.children) ? props.children : null }
			{ suffix }
		</button>
	);
}) as Button;

Button.Group = Group;

Object.freeze(Button);

export { Button };
