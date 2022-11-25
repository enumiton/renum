import { forwardRef } from 'react';
import type { ClearProps } from './interface';
import { default as ClearIcon } from '../../icons/X';
import { useRenumProvider } from '../renum-provider';
import { classNames } from '../../utils';

const Clear = forwardRef<HTMLSpanElement, ClearProps>(function (props, ref) {
	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('clear');

	return (
		<span
			tabIndex={ -1 }
			aria-hidden="true"
			{ ...props }
			className={ classNames(prefixCls, props.className) }
			ref={ ref }
		>
			<ClearIcon />
		</span>
	);
});

export { Clear };
