import type { DialogBodyProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

function DialogBody(props: DialogBodyProps) {
	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	return (
		<div { ...props } className={ $(`${ prefixCls }-body`, props.className) } />
	);
}

export { DialogBody };
