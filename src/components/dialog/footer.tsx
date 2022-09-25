import type { DialogFooterProps } from './interface';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import { isHTMLElement } from '../../utils';
import { Button } from '../button';

function renderList(prefixCls: string, child: ReactNode) {
	return (
		<ul className={ `${ prefixCls }-footer-actions` } role="list">
			{ child }
		</ul>
	);
}

function DialogFooter(props: DialogFooterProps) {
	const {
		footer,
		prefixCls,
		close,
		onConfirm,
	} = props;

	function renderFooter() {
		if (isValidElement(footer) || isHTMLElement(footer)) {
			return footer;
		}

		if (Array.isArray(footer)) {
			return renderList(
				prefixCls,
				footer.map(function (btn, i) {
					return (
						<li key={ i }>
							{ btn }
						</li>
					);
				}),
			);
		}

		return renderList(prefixCls, (
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
		));
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
