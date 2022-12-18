import type { ReactPortal } from 'react';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames, isNonNullable } from '../../utils';
import { useRenumProvider } from '../renum-provider';
import type { PortalPosition, PortalProps } from './interface';
import { getPosition } from './helpers';

const Portal = forwardRef<HTMLDivElement, PortalProps>(function (props, ref): ReactPortal {
	const {
		target,
		container,
		align = ['bottom', 'start'],
		key,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('portal');

	const childRef = useRef<HTMLElement | null>(null);

	const [position, setPosition] = useState<PortalPosition>({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	const mount = container || window.document.body;

	function update() {
		if (!childRef?.current || !target?.current) {
			return;
		}

		setPosition(getPosition(
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

	useLayoutEffect(update, []);

	if (!mount) {
		throw new Error('[Renum/Portal]: no mount');
	}

	return createPortal((
		<div
			{ ...rest }
			className={ classNames(prefixCls, rest.className) }
			style={ { ...rest.style, ...position } }
			ref={ function (node) {
				childRef.current = node;

				if (typeof ref === 'function') {
					ref(node);
				} else if (isNonNullable(ref)) {
					ref.current = node;
				}
			} }
		>
			{ children }
		</div>
	), mount, key);
});

export { Portal };
