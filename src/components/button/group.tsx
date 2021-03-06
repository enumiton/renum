import { forwardRef } from 'react';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { ButtonGroupProps } from './interface';


const Group = forwardRef<HTMLDivElement, ButtonGroupProps>(function (props, ref) {
	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('btn-group');

	return (
		<div { ...props } className={ classNames(prefixCls, props.className) } ref={ ref } />
	);
});

export { Group };
