import { forwardRef, useEffect, useId, useRef } from 'react';
import type { DialogProps } from './interface';
import { Portal } from '../portal';
import { useConfigProvider } from '../renum-provider';
import { classNames, getKey, isHTMLElement, Key } from '../../utils';
import { handleFocus, TabDirection } from './helpers';
import { useMounted, useScrollLock } from '../../hooks';
import { DialogHeader } from './header';
import { DialogFooter } from './footer';

const Dialog = forwardRef<HTMLDivElement, DialogProps>(function (props, ref) {
	const {
		id: _id,
		open,
		title,
		alert,
		modal = true,
		backdropCloseable = true,
		closeable = true,
		onClose,
		onConfirm,
		footer = true,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('dialog');

	const mounted = useMounted();
	const { lock, unlock } = useScrollLock();

	const originRef = useRef<HTMLElement | null>(null);
	const portalRef = useRef<HTMLDivElement | null>(null);

	const id = _id || useId();
	const titleId = `${ id }-title`;

	function close() {
		if (!closeable) {
			return;
		}

		if (originRef.current) {
			originRef.current?.focus();
		}

		originRef.current = null;

		if (onClose) {
			onClose();
		}

		unlock();
	}

	function handleKeyDown(e: KeyboardEvent) {
		const key = getKey(e.key);

		switch (key) {
			case Key.Tab: {
				if (open && modal) {
					handleFocus(e.shiftKey ? TabDirection.Backward : TabDirection.Forward, e, portalRef.current);
				}

				break;
			}
			case Key.Escape: {
				close();

				break;
			}
		}
	}

	function handleBackdropClick() {
		if (!backdropCloseable) {
			return;
		}

		close();
	}

	useEffect(function () {
		if (open) {
			const originElement = window.document.activeElement;
			const dialog = portalRef.current?.firstElementChild;

			if (isHTMLElement(originElement)) {
				originRef.current = originElement;
			}

			if (isHTMLElement(dialog)) {
				dialog.focus();
			}

			lock();

			window.addEventListener('keydown', handleKeyDown, { passive: false });
		} else if (mounted) {
			close();
		}

		return function () {
			if (mounted) {
				window.removeEventListener('keydown', handleKeyDown);
			}
		};
	}, [open]);

	return (
		<Portal
			hidden={ !open }
			className={ `${ prefixCls }-portal` }
			ref={ portalRef }
		>
			<div
				{ ...rest }
				id={ id }
				className={ classNames(prefixCls, rest.className) }
				role={ alert ? 'alertdialog' : 'dialog' }
				aria-modal={ Boolean(modal) }
				aria-hidden={ !open }
				aria-labelledby={ titleId }
				tabIndex={ -1 }
				ref={ ref }
			>
				<DialogHeader
					title={ title }
					titleId={ titleId }
					prefixCls={ prefixCls }
					closeable={ closeable }
					close={ close }
				/>
				<div role="document" className={ `${ prefixCls }-body` }>
					{ children }
				</div>
				<DialogFooter
					footer={ footer }
					prefixCls={ prefixCls }
					close={ close }
					onConfirm={ onConfirm }
				/>
			</div>
			{ modal ? (
				<div className={ `${ prefixCls }-backdrop` } onClick={ handleBackdropClick } />
			) : null }
		</Portal>
	);
});

export { Dialog };
