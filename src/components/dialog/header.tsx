import { Button } from '../button';
import { default as CloseIcon } from '../../icons/X';
import type { DialogHeaderProps } from './interface';
import { useRenumProvider } from '../renum-provider';

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

	const { locale } = useRenumProvider();

	return (
		<div className={ `${ prefixCls }-header` }>
			<h2 id={ titleId } className={ `${ prefixCls }-title` }>
				{ title }
			</h2>
			{ closeable ? (
				<Button
					type="invisible"
					shape="circle"
					aria-label={ locale.close }
					icon={ CLOSE_ICON }
					onClick={ close }
					className={ `${ prefixCls }-close` }
				/>
			) : null }
		</div>
	);
}

export { DialogHeader };
