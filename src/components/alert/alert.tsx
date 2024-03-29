import { forwardRef, isValidElement, useState } from 'react';
import type { AlertProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { Button } from '../button';
import { default as InfoIcon } from '../../icons/InfoCircle';
import { default as CircleCheckIcon } from '../../icons/CircleCheck';
import { default as AlertTriangleIcon } from '../../icons/AlertTriangle';
import { default as AlertCirceIcon } from '../../icons/AlertCircle';
import { default as CloseIcon } from '../../icons/X';
import { $, isNullable, isString } from '../../utils';

const INFO_ICON = <InfoIcon />;
const SUCCESS_ICON = <CircleCheckIcon />;
const DANGER_ICON = <AlertTriangleIcon />;
const ERROR_ICON = <AlertCirceIcon />;
const CLOSE_ICON = <CloseIcon />;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	const {
		icon = true,
		type = 'light',
		title,
		banner,
		actions,
		closeable,
		className,
		children,
		...rest
	} = props;

	const { getPrefixCls, locale } = useRenumProvider();
	const prefixCls = getPrefixCls('alert');

	const [closed, setClosed] = useState<boolean>(false);

	function handleClose() {
		setClosed(true);
	}

	function renderIcon() {
		if (isValidElement(icon)) {
			return icon;
		}

		if (!icon) {
			return null;
		}

		switch (type) {
			case 'light':
			case 'primary':
			case 'info':
				return INFO_ICON;
			case 'success':
				return SUCCESS_ICON;
			case 'danger':
				return DANGER_ICON;
			case 'error':
				return ERROR_ICON;
			default:
				return null;
		}
	}

	if (closed) {
		return null;
	}

	return (
		<div
			{ ...rest }
			className={ $(prefixCls, className, {
				[`${ prefixCls }-${ type }`]: !!type && type !== 'light',
				[`${ prefixCls }-banner`]: banner,
			}) }
			ref={ ref }
		>
			{ renderIcon() }
			<div className={ $(`${ prefixCls }-content`) }>
				{ (title) ? (
					<div className={ `${ prefixCls }-title` }>{ title }</div>
				) : null }
				{ (isString(children) && title) ? (
					<p>{ children }</p>
				) : children }
				{ (isNullable(actions) || (Array.isArray(actions) && actions.length === 0) ? null : (
					<div className={ `${ prefixCls }-actions` }>
						{ actions }
					</div>
				)) }
			</div>
			{ (closeable) ? (
				<div>
					<Button
						aria-label={ locale.close }
						className={ `${ prefixCls }-close` }
						icon={ CLOSE_ICON }
						onClick={ handleClose }
						shape="circle"
						type="text"
					/>
				</div>
			) : null }
		</div>
	);
});

export { Alert };
