import type { DialogBodyProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { classNames } from '../../utils';

function DialogBody(props: DialogBodyProps) {
	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	return (
		<div { ...props } className={ classNames(`${ prefixCls }-body`, props.className) } />
	);
}

export { DialogBody };
