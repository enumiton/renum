import { forwardRef } from 'react';
import { $ } from '../../utils';
import { Icon } from '../icon';
import { useRenumProvider } from '../renum-provider';
import type { LoadingProps } from './interface';

const Loading = forwardRef<HTMLSpanElement, LoadingProps>(function Loading(props, ref) {
	const { active, ...rest } = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('loading');

	return (
		<Icon
			{ ...rest }
			className={ $(prefixCls, {
				[`${ prefixCls }-active`]: (!!active),
			}, props.className) }
			ref={ ref }
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" strokeWidth="2"
				 stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M15.958 3.915A9 9 0 0 0 3 12" />
			</svg>
		</Icon>
	);
});

export { Loading };
