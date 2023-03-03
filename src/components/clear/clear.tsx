import { forwardRef } from 'react';
import type { ClearProps } from './interface';
import { default as ClearIcon } from '../../icons/X';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

const CLEAR_ICON = <ClearIcon />;

const Clear = forwardRef<HTMLSpanElement, ClearProps>(function Clear(props, ref) {
	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('clear');

	return (
		<span
			tabIndex={ -1 }
			aria-hidden="true"
			{ ...props }
			className={ $(prefixCls, props.className) }
			ref={ ref }
		>
			{ props.icon ?? CLEAR_ICON }
		</span>
	);
});

export { Clear };
