import { forwardRef, useId, useRef } from 'react';
import { Dialog } from './dialog';
import type { DialogConfirmProps } from './interface';
import { classNames, isString } from '../../utils';
import { DialogHeader } from './header';
import { useRenumProvider } from '../renum-provider';
import { DialogFooter } from './footer';
import { DialogBody } from './body';

const Confirm = forwardRef<HTMLDialogElement, DialogConfirmProps>(function DialogConfirm(props, ref) {
	const {
		id: _id,
		title,
		actions,
		stacked,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	const id = _id || useId();
	const titleId = id + '-title';

	let descriptionId = useRef<string | undefined>(undefined);

	function renderBody() {
		descriptionId.current = undefined;

		if (isString(children)) {
			descriptionId.current = id + '-description';

			return (
				<p id={ descriptionId.current }>
					{ children }
				</p>
			);
		}

		return children;
	}

	return (
		<Dialog
			{ ...rest }
			id={ id }
			role="alertdialog"
			className={ classNames(`${ prefixCls }-confirm`, rest.className) }
			aria-labelledby={ titleId }
			aria-describedby={ descriptionId.current }
			modal
			fullscreen={ false }
			closeable={ false }
			backdropCloseable={ false }
			ref={ ref }
		>
			<DialogHeader title={ title } titleId={ titleId } showClose={ false } />
			<DialogBody>
				{ renderBody() }
			</DialogBody>
			<DialogFooter className={ classNames({ [`${ prefixCls }-footer-stacked`]: stacked }) }>
				{ actions }
			</DialogFooter>
		</Dialog>
	);
});

export { Confirm };
