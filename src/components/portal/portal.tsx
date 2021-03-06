import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { PortalProps } from './interface';

function Portal({ key, target, container, ...props }: PortalProps) {
	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('portal');
	const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0 });

	const mount = container || document.body;

	// @todo handle `position`
	function update() {
		if (!target?.current) {
			return;
		}

		const { top, left, width, height } = target.current.getBoundingClientRect();

		setPosition({
			top: top + height + window.scrollY,
			left: left + window.scrollX,
			width,
			height
		});
	}

	useEffect(update, [target?.current, props.hidden]);

	if (!mount) {
		throw new Error('[Renum/Portal]: no mount');
	}

	return createPortal((
		<div
			{ ...props }
			className={ classNames(prefixCls, props.className) }
			style={ { left: position.left, top: position.top, minWidth: position.width } }
		>
			{ props.children }
		</div>
	), mount, key);
}

export { Portal };
