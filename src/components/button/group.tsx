import { forwardRef } from 'react';
import { $ } from '../../utils';
import { useRenumProvider } from '../renum-provider';
import type { ButtonGroupProps } from './interface';

const Group = forwardRef<HTMLDivElement, ButtonGroupProps>(function Group(props, ref) {
	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('btn-group');

	return (
		<div { ...props } className={ $(prefixCls, props.className) } ref={ ref } />
	);
});

export { Group };
