import { forwardRef, useEffect, useId, useRef } from 'react';
import type { DialogProps } from './interface';
import { Portal } from '../portal';
import { useConfigProvider } from '../renum-provider';
import { classNames, getKey, isHTMLElement, Key } from '../../utils';
import { Button } from '../button';
import { default as CloseIcon } from '../../icons/X';
import { handleFocus, TabDirection } from './helpers';
import { useMounted } from '../../hooks';

const CLOSE_ICON = <CloseIcon />;

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

	const originRef = useRef<HTMLElement | null>(null);
	const portalRef = useRef<HTMLDivElement | null>(null);

	const id = _id || useId();
	const titleId = `${ id }-title`;

	function close() {
		if (originRef.current) {
			originRef.current?.focus();
		}

		originRef.current = null;

		if (onClose) {
			onClose();
		}
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
				if (closeable) {
					close();
				}

				break;
			}
		}
	}

	function handleBackdropClick() {
		if (!closeable || !backdropCloseable) {
			return;
		}

		close();
	}

	useEffect(function () {
		if (open) {
			const activeElement = window.document.activeElement;
			const dialog = portalRef.current?.firstElementChild;

			if (isHTMLElement(activeElement)) {
				originRef.current = activeElement;
			}

			if (isHTMLElement(dialog)) {
				dialog.focus();
			}

			window.addEventListener('keydown', handleKeyDown, { passive: false });
		} else {
			if (mounted) {
				close();
			}
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
				<div className={ `${ prefixCls }-header` }>
					<h2 id={ titleId } className={ `${ prefixCls }-title` }>
						{ title }
					</h2>
					{ closeable ? (
						<Button
							type="invisible"
							shape="circle"
							aria-label="Close dialog"
							icon={ CLOSE_ICON }
							onClick={ close }
							className={ `${ prefixCls }-close` }
						/>
					) : null }
				</div>
				<div role="document" className={ `${ prefixCls }-body` }>
					{ children }
				</div>
				{ footer ? (
					<div className={ `${ prefixCls }-footer` }>
						<ul>
							{ Array.isArray(footer) ? (
								footer.map(function (btn, i) {
									return (
										<li key={ i }>
											{ btn }
										</li>
									);
								})
							) : (
								<>
									<li>
										<Button type="invisible" onClick={ close }>
											Cancel
										</Button>
									</li>
									<li>
										<Button type="primary" onClick={ onConfirm }>
											Ok
										</Button>
									</li>
								</>
							) }
						</ul>
					</div>
				) : null }
			</div>
			{ modal ? (
				<div className={ `${ prefixCls }-backdrop` } onClick={ handleBackdropClick } />
			) : null }
		</Portal>
	);
});

export { Dialog };
