import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { PortalProps } from './interface';

function Portal({ key, target, container, ...props }: PortalProps) {
	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('portal');
	const [position, setPosition] = useState({ left: 0, top: 0 });

	const mount = container || document.body;

	useEffect(function () {
		if (!target?.current) {
			return;
		}

		const { top, left, height } = target.current.getBoundingClientRect();

		setPosition({ top: top + height, left });
	}, [target?.current, props.hidden]);

	if (!mount) {
		throw new Error('[Renum/Portal]: no mount');
	}

	return createPortal((
		<div
			{ ...props }
			className={ classNames(prefixCls, props.className) }
			style={ { left: position.left, top: position.top } }
		>
			{ props.children }
		</div>
	), mount, key);
}

export { Portal };
