import type { ReactPortal } from 'react';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { $, duplicateRef } from '../../utils';
import { useRenumProvider } from '../renum-provider';
import type { PortalPosition, PortalProps } from './interface';
import { getPosition } from './helpers';
import { useResize } from '../../hooks';

const Portal = forwardRef<HTMLDivElement, PortalProps>(function Portal(props, ref): ReactPortal {
	const {
		key,
		target,
		container,
		align = 'bottom-start',
		setWidth,
		setMinWidth,
		setHeight,
		setMinHeight,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('portal');

	const childRef = useRef<HTMLDivElement | null>(null);

	const [pos, setPos] = useState<PortalPosition>({
		top: 0,
		left: 0,
	});

	const mount = container || window.document.body;

	function update() {
		if (!childRef?.current || !target?.current) {
			return;
		}

		setPos(getPosition(
			target.current,
			childRef.current,
			align,
		));
	}

	useLayoutEffect(function () {
		if (!rest.hidden) {
			update();
		}
	}, [target?.current, rest.hidden]);

	useResize(update);

	if (!mount) {
		throw new Error('[Renum/Portal]: no mount');
	}

	return createPortal((
		<div
			{ ...rest }
			className={ $(prefixCls, rest.className) }
			style={ {
				...rest.style,
				width: (setWidth && pos.width) ? pos.width + 'px' : undefined,
				minWidth: (setMinWidth && pos.width) ? pos.width + 'px' : undefined,
				height: (setHeight && pos.height) ? pos.height + 'px' : undefined,
				minHeight: (setMinHeight && pos.height) ? pos.height + 'px' : undefined,
				transform: `translate(${ pos.left }px, ${ pos.top }px)`,
			} }
			ref={ duplicateRef(childRef, ref) }
		>
			{ children }
		</div>
	), mount, key);
});

export { Portal };
