import type { PortalAlign, PortalAlignOffset, PortalAlignSide, PortalPosition } from './interface';

// @todo refactor
function getAlignment(target: HTMLElement, align: PortalAlign): PortalAlign {
	const isRTL = target ? window.getComputedStyle(target).direction === 'rtl' : false;
	const rect = target?.getBoundingClientRect();
	const [widthThreshold, heightThreshold] = [window.innerWidth / 2, window.innerHeight / 2];

	let [lhs, rhs] = align.split('-') as [PortalAlignSide, PortalAlignOffset];

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

// @todo refactor
function getPosition(target: HTMLElement, child: HTMLElement, align: PortalAlign): PortalPosition {
	const { scrollX, scrollY } = window;

	align = getAlignment(target, align);

	const targetRect = target.getBoundingClientRect();
	const childRect = child.getBoundingClientRect();

	let margin = child?.firstElementChild ? Number.parseInt(window.getComputedStyle(child.firstElementChild).margin) : 0;

	if (Number.isNaN(margin)) {
		margin = 0;
	}

	const position: PortalPosition = {
		top: undefined,
		left: undefined,
	};

	switch (align) {
		case 'top-start':
			position.top = targetRect.top - childRect.height + scrollY;
			position.left = targetRect.left + scrollX;
			break;
		case 'top-center':
			position.top = targetRect.top - childRect.height + scrollY;
			position.left = targetRect.left + (childRect.width / 2 - targetRect.width / 2) + scrollX;
			break;
		case 'top-end':
			position.top = targetRect.top - childRect.height + scrollY;
			position.left = targetRect.right - childRect.width + scrollX;
			break;
		case 'right-start':
			position.top = targetRect.top + scrollY;
			position.left = targetRect.right + scrollX;
			break;
		case 'right-center':
			position.top = targetRect.top + (childRect.height / 2 - targetRect.height / 2) + scrollY;
			position.left = targetRect.right + scrollX;
			break;
		case 'right-end':
			position.top = targetRect.bottom - childRect.height + scrollY;
			position.left = targetRect.right + scrollX + margin;
			break;
		case 'bottom-start':
			position.top = targetRect.bottom + scrollY;
			position.left = targetRect.left + scrollX;
			break;
		case 'bottom-center':
			position.top = targetRect.bottom + scrollY;
			position.left = targetRect.left - (childRect.width / 2 - targetRect.width / 2) + scrollX;
			break;
		case 'bottom-end':
			position.top = targetRect.bottom + scrollY;
			position.left = targetRect.right - childRect.width + scrollX;
			break;
		case 'left-start':
			position.top = targetRect.top + scrollY;
			position.left = targetRect.left - childRect.width + scrollX;
			break;
		case 'left-center':
			position.top = targetRect.top + (childRect.height / 2 - targetRect.height / 2) + scrollY;
			position.left = targetRect.left - childRect.width + scrollX;
			break;
		case 'left-end':
			position.top = targetRect.bottom - childRect.height + scrollY;
			position.left = targetRect.left - childRect.width + scrollX;
			break;
	}

	return position;
}

export { getAlignment, getPosition };
