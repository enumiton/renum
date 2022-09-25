import { Button } from '../button';
import { default as CloseIcon } from '../../icons/X';
import type { DialogHeaderProps } from './interface';

const CLOSE_ICON = <CloseIcon />;

/** @internal */
function DialogHeader(props: DialogHeaderProps) {
	const {
		title,
		titleId,
		prefixCls,
		closeable,
		close,
	} = props;

	return (
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
	);
}

export { DialogHeader };
