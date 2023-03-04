import { forwardRef, useId } from 'react';
import { Dialog } from './dialog';
import type { DialogModalProps } from './interface';
import { DialogHeader } from './header';
import { useRenumProvider } from '../renum-provider';
import { DialogFooter } from './footer';
import { $ } from '../../utils';
import { DialogBody } from './body';

const Modal = forwardRef<HTMLDialogElement, DialogModalProps>(function DialogModal(props, ref) {
	const {
		id: _id,
		title,
		onConfirm,
		closeable,
		footer,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	const id = _id || useId();
	const titleId = id + '-title';

	return (
		<Dialog
			{ ...rest }
			id={ id }
			className={ $(`${ prefixCls }-modal`, rest.className) }
			aria-labelledby={ titleId }
			ref={ ref }
		>
			<DialogHeader title={ title } titleId={ titleId } showClose={ closeable } />
			<DialogBody>
				{ children }
			</DialogBody>
			<DialogFooter onConfirm={ onConfirm }>
				{ footer }
			</DialogFooter>
		</Dialog>
	);
});

export { Modal };
