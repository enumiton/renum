import { forwardRef, isValidElement, useState } from 'react';
import type { AlertProps } from './interface';
import { useConfigProvider } from '../renum-provider';
import { Button } from '../button';
import { default as InfoIcon } from '../../icons/InfoCircle';
import { default as CircleCheckIcon } from '../../icons/CircleCheck';
import { default as AlertTriangleIcon } from '../../icons/AlertTriangle';
import { default as AlertCirceIcon } from '../../icons/AlertCircle';
import { default as CloseIcon } from '../../icons/X';
import { classNames, isString } from '../../utils';

const INFO_ICON = <InfoIcon />;
const SUCCESS_ICON = <CircleCheckIcon />;
const DANGER_ICON = <AlertTriangleIcon />;
const ERROR_ICON = <AlertCirceIcon />;
const CLOSE_ICON = <CloseIcon />;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function (props, ref) {
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

	const { getPrefixCls } = useConfigProvider();
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

	function renderActions() {
		if (!actions) {
			return null;
		}

		if (Array.isArray(actions) && actions.length <= 0) {
			return null;
		}

		return (
			<div className={ `${ prefixCls }-actions` }>
				{ actions }
			</div>
		);
	}

	function renderCloseBtn() {
		if (!closeable) {
			return null;
		}

		return (
			<Button
				aria-label="Close alert" // @todo localize
				className={ `${ prefixCls }-close` }
				icon={ CLOSE_ICON }
				onClick={ handleClose }
				shape="circle"
				type="invisible"
			/>
		);
	}

	if (closed) {
		return null;
	}

	return (
		<div
			{ ...rest }
			className={ classNames(prefixCls, className, {
				[`${ prefixCls }-${ type }`]: !!type && type !== 'light',
				[`${ prefixCls }-banner`]: banner,
			}) }
			ref={ ref }
		>
			{ renderIcon() }
			<div className={ classNames(`${ prefixCls }-content`) }>
				{ title ? (
					<div className={ `${ prefixCls }-title` }>{ title }</div>
				) : null }
				{ isString(children) && title ? (
					<p>{ children }</p>
				) : children }
				{ renderActions() }
			</div>
			{ renderCloseBtn() }
		</div>
	);
});

export { Alert };
