import type { ReactPortal } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils';
import { useRenumProvider } from '../renum-provider';
import type { PortalProps } from './interface';

const Portal = forwardRef<HTMLDivElement, PortalProps>(function (props, ref): ReactPortal {
	const {
		target,
		container,
		key,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('portal');
	const [position, setPosition] = useState({ left: 0, top: 0, width: 0, height: 0 });

	const mount = container || window.document.body;

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
			height,
		});
	}

	useEffect(update, [target?.current, rest.hidden]);

	if (!mount) {
		throw new Error('[Renum/Portal]: no mount');
	}

	return createPortal((
		<div
			{ ...rest }
			className={ classNames(prefixCls, rest.className) }
			style={ { left: position.left, top: position.top, minWidth: position.width } }
			ref={ ref }
		>
			{ props.children }
		</div>
	), mount, key);
});

export { Portal };
