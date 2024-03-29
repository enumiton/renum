import { cloneElement, forwardRef } from 'react';
import { $ } from '../../utils';
import { useRenumProvider } from '../renum-provider';
import type { IconProps } from './interface';

const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(props, ref) {
	const {
		className,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('icon');

	return (
		<span
			ref={ ref }
			className={ $(prefixCls, className) }
		>
			{ cloneElement(children, rest) }
		</span>
	);
});

export { Icon };
