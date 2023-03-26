import type { DialogFooterProps } from './interface';
import { Button } from '../button';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

function DialogFooter(props: DialogFooterProps) {
	const {
		onCancel,
		onConfirm,
		children,
		...rest
	} = props;

	const { locale, getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	// User explicitly removed the footer.
	if (children === null || children === false) {
		return null;
	}

	return (
		<div { ...rest } className={ $(`${ prefixCls }-footer`, rest.className) }>
			{ (children === undefined) ? ([
				<Button key="confirm" type="primary" onClick={ onConfirm }>
					{ locale.dialog.primaryButtonText }
				</Button>,
				<Button key="cancel" type="light" onClick={ onCancel }>
					{ locale.dialog.cancelButtonText }
				</Button>,
			]) : children }
		</div>
	);
}

export { DialogFooter };
