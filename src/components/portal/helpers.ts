import type { PortalAlign, PortalAlignPosition, PortalAlignSide, PortalPosition } from './interface';

function getAlignment(target: HTMLElement, align: PortalAlign): PortalAlign {
	const isRTL = target ? window.getComputedStyle(target).direction === 'rtl' : false;
	const rect = target?.getBoundingClientRect();
	const [widthThreshold, heightThreshold] = [window.innerWidth / 2, window.innerHeight / 2];

	let [lhs, rhs] = align.split('-') as [PortalAlignSide, PortalAlignPosition];

	if (isRTL) {
		switch (lhs) {
			case 'top':
				lhs = 'bottom';
				break;
			case 'bottom':
				lhs = 'top';
				break;
			case 'left':
				lhs = 'right';
				break;
			case 'right':
				lhs = 'left';
				break;
		}

		switch (rhs) {
			case 'start':
				rhs = 'end';
				break;
			case 'end':
				rhs = 'start';
				break;
		}
	}

	if (!rect) {
		return align;
	}

	// noinspection IfStatementWithTooManyBranchesJS
	if (lhs === 'right' && rect.right > widthThreshold) {
		lhs = 'left';
	} else if (lhs === 'left' && rect.left < widthThreshold) {
		lhs = 'right';
	} else if (lhs === 'top' && rect.top < heightThreshold) {
		lhs = 'bottom';
	} else if (lhs === 'bottom' && rect.bottom > heightThreshold) {
		lhs = 'top';
	}

	return `${ lhs }-${ rhs }` as const;
}

function getPosition(target: HTMLElement, child: HTMLElement, align: PortalAlign): PortalPosition {
	const { scrollX, scrollY } = window;

	align = getAlignment(target, align);

	const targetRect = target.getBoundingClientRect();
	const childRect = child.getBoundingClientRect();

	const position: PortalPosition = {
		top: 0,
		left: 0,
		width: target.clientWidth,
		height: target.clientHeight,
	};

	const computed = window.getComputedStyle(window.document.body);
	const offset = (Number(computed.fontSize) || 16) * 0.25;

	switch (align) {
		case 'top-start':
			position.top = targetRect.top - childRect.height - offset;
			position.left = targetRect.left;
			break;
		case 'top-center':
			position.top = targetRect.top - childRect.height - offset;
			position.left = targetRect.left - (childRect.width / 2 - targetRect.width / 2);
			break;
		case 'top-end':
			position.top = targetRect.top - childRect.height - offset;
			position.left = targetRect.right - childRect.width;
			break;
		case 'right-start':
			position.top = targetRect.top;
			position.left = targetRect.right + offset;
			break;
		case 'right-center':
			position.top = targetRect.top - (childRect.height / 2 - targetRect.height / 2);
			position.left = targetRect.right + offset;
			break;
		case 'right-end':
			position.top = targetRect.bottom - childRect.height;
			position.left = targetRect.right + offset;
			break;
		case 'bottom-start':
			position.top = targetRect.bottom + offset;
			position.left = targetRect.left;
			break;
		case 'bottom-center':
			position.top = targetRect.bottom + offset;
			position.left = targetRect.left - (childRect.width / 2 - targetRect.width / 2);
			break;
		case 'bottom-end':
			position.top = targetRect.bottom + offset;
			position.left = targetRect.right - childRect.width;
			break;
		case 'left-start':
			position.top = targetRect.top;
			position.left = targetRect.left - childRect.width - offset;
			break;
		case 'left-center':
			position.top = targetRect.top - (childRect.height / 2 - targetRect.height / 2);
			position.left = targetRect.left - childRect.width - offset;
			break;
		case 'left-end':
			position.top = targetRect.bottom - childRect.height;
			position.left = targetRect.left - childRect.width - offset;
			break;
	}

	position.top = (position.top + scrollY) | 0;
	position.left = (position.left + scrollX) | 0;

	return position;
}

export { getAlignment, getPosition };
