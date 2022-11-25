import type { DialogFooterProps } from './interface';
import { isValidElement } from 'react';
import { isHTMLElement } from '../../utils';
import { Button } from '../button';
import { useRenumProvider } from '../renum-provider';

function DialogFooter(props: DialogFooterProps) {
	const {
		footer,
		prefixCls,
		close,
		onConfirm,
	} = props;

	const { locale } = useRenumProvider();

	function renderFooter() {
		if (isValidElement(footer) || isHTMLElement(footer)) {
			return footer;
		}

		if (Array.isArray(footer)) {
			return footer;
		}

		return (
			<>
				<Button type="primary" onClick={ onConfirm }>
					{ locale.dialog.primaryButtonText }
				</Button>
				<Button type="invisible" onClick={ close }>
					{ locale.dialog.cancelButtonText }
				</Button>
			</>
		);
	}

	// User explicitly removed the footer.
	if (footer === null || footer === false) {
		return null;
	}

	return (
		<div className={ `${ prefixCls }-footer` }>
			{ renderFooter() }
		</div>
	);
}

export { DialogFooter };
