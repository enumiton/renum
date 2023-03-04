import type { MouseEvent } from 'react';
import { Button } from '../button';
import { default as CloseIcon } from '../../icons/X';
import type { DialogHeaderProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $, isHTMLButtonElement } from '../../utils';

const CLOSE_ICON = <CloseIcon />;

function DialogHeader(props: DialogHeaderProps) {
	const {
		title,
		titleId,
		showClose = true,
		...rest
	} = props;

	const { locale, getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('dialog');

	function handleClick(e: MouseEvent<HTMLButtonElement>) {
		const btn = e.currentTarget;

		if (!isHTMLButtonElement(btn)) {
			return;
		}

		const dialog = btn.closest('dialog');

		dialog?.close();
	}

	return (
		<div { ...rest } className={ $(`${ prefixCls }-header`, rest.className) }>
			{ (typeof title === 'function') ? (
				title(titleId)
			) : (
				<>
					<h2 id={ titleId } className={ `${ prefixCls }-title` }>
						{ title }
					</h2>
					{ showClose ? (
						<Button
							type="text"
							shape="circle"
							aria-label={ locale.close }
							icon={ CLOSE_ICON }
							onClick={ handleClick }
							className={ `${ prefixCls }-close` }
						/>
					) : null }
				</>
			) }
		</div>
	);
}

export { DialogHeader };
