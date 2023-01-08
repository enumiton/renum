import type { FormEvent, ForwardRefExoticComponent, MouseEvent, RefAttributes, SyntheticEvent } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import type { DialogProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { classNames, isHTMLElement, isNonNullable } from '../../utils';
import { Confirm } from './confirm';
import { Modal } from './modal';
import { lockBody, unlockBody } from './helpers';

interface Dialog extends ForwardRefExoticComponent<DialogProps & RefAttributes<HTMLDialogElement>> {
	Confirm: typeof Confirm;
	Modal: typeof Modal;
}

const Dialog: Dialog = forwardRef<HTMLDialogElement, DialogProps>(function (props, ref) {
	const {
		id: _id,
		open: _open,
		role = 'dialog',
		modal = true,
		closeable = true,
		backdropCloseable = true,
		fullscreen = true,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	const dialogRef = useRef<HTMLDialogElement | null>(null);

	function open() {
		const dialog = dialogRef.current;

		if (!isHTMLElement(dialog) || dialog.open) {
			return;
		}

		if (modal) {
			lockBody();

			dialog.showModal();
		} else {
			dialog.show();
		}
	}

	function close(returnValue?: string | undefined) {
		const dialog = dialogRef.current;

		if (!isHTMLElement(dialog) || !dialog.open) {
			return;
		}

		dialog.close(returnValue ?? dialog.returnValue);
	}

	function handleClose(e: SyntheticEvent<HTMLDialogElement>) {
		unlockBody();

		if (rest.onClose) {
			rest.onClose(e);
		}
	}

	function handleCancel(e: SyntheticEvent<HTMLDialogElement>) {
		if (!closeable) {
			e.preventDefault();
			return;
		}

		if (rest.onCancel) {
			rest.onCancel(e);
		}
	}

	function handleSubmit(e: FormEvent<HTMLDialogElement>) {
		if (rest.onSubmit) {
			rest.onSubmit(e);
		}
	}

	function handleClick(e: MouseEvent<HTMLDialogElement>) {
		const dialog = dialogRef.current;

		if (!backdropCloseable || !isHTMLElement(dialog) || e.target !== dialog) {
			return;
		}

		// Return if it was a key press rather than a mouse click.
		if (e.clientX === 0 && e.clientY === 0 && e.detail === 0) {
			return;
		}

		const x = e.clientX;
		const y = e.clientY;

		const {
			top: minY,
			bottom: maxY,
			left: minX,
			right: maxX,
		} = dialog.getBoundingClientRect();

		if ((x < minX || x > maxX) ||
			(y < minY || y > maxY)) {
			close();
		}

		if (rest.onClick) {
			rest.onClick(e);
		}
	}

	useEffect(function () {
		if (_open) {
			open();
		} else {
			close();
		}

		return close;
	}, [_open]);

	return (
		<dialog
			{ ...rest }
			role={ role }
			onClick={ handleClick }
			onCancel={ handleCancel }
			onSubmit={ handleSubmit }
			onClose={ handleClose }
			className={ classNames(prefixCls, rest.className, { [`${ prefixCls }-fullscreen`]: fullscreen }) }
			ref={ function (node) {
				dialogRef.current = node;

				if (typeof ref === 'function') {
					ref(node);
				} else if (isNonNullable(ref)) {
					ref.current = node;
				}
			} }
		/>
	);
}) as Dialog;

Dialog.Confirm = Confirm;
Dialog.Modal = Modal;

Object.freeze(Dialog);

export { Dialog };
