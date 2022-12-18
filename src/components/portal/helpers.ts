import type { PortalAlign, PortalAlignOffset, PortalPosition } from './interface';

// @todo refactor
function getAlignment(target: HTMLElement, [align, offset]: [PortalAlign, PortalAlignOffset]): [PortalAlign, PortalAlignOffset] {
	const isRTL = target ? window.getComputedStyle(target).direction === 'rtl' : false;
	const rect = target?.getBoundingClientRect();
	const [widthThreshold, heightThreshold] = [window.innerWidth / 2, window.innerHeight / 2];

	if (isRTL) {
		switch (align) {
			case 'right':
				align = 'left';
				break;
			case 'left':
				align = 'right';
				break;
		}

		switch (offset) {
			case 'start':
				offset = 'end';
				break;
			case 'end':
				offset = 'start';
				break;
		}
	}

	if (!rect) {
		return [align, offset];
	}

	if (align === 'right' && rect.right > widthThreshold) {
		align = 'left';
	} else if (align === 'left' && rect.left < widthThreshold) {
		align = 'right';
	} else if (align === 'top' && rect.top < heightThreshold) {
		align = 'bottom';
	} else if (align === 'bottom' && rect.bottom > heightThreshold) {
		align = 'top';
	}

	return [align, offset];
}

// @todo refactor
function getPosition(target: HTMLElement, child: HTMLElement, placement: [PortalAlign, PortalAlignOffset]): PortalPosition {
	const { scrollX, scrollY } = window;
	const [align, offset] = getAlignment(target, placement);

	const targetRect = target.getBoundingClientRect();
	const childRect = child.getBoundingClientRect();

	let margin = child?.firstElementChild ? Number.parseInt(window.getComputedStyle(child.firstElementChild).margin) : 0;

	if (Number.isNaN(margin)) {
		margin = 0;
	}

	const position: PortalPosition = {
		top: undefined,
		right: undefined,
		bottom: undefined,
		left: undefined,
	};

	switch (align) {
		case 'top':
			position.top = targetRect.top - childRect.height + scrollY - margin;
			break;
		case 'bottom':
			position.top = targetRect.bottom + scrollY + margin;
			break;
		case 'left':
			position.left = targetRect.left - childRect.width + scrollX - margin;
			break;
		case 'right':
			position.left = targetRect.right + scrollX + margin;
			break;
	}

	switch (offset) {
		case 'start': {
			if (align === 'top' || align === 'bottom') {
				position.left = targetRect.left + scrollX - margin;
			} else {
				position.top = targetRect.top + scrollY - margin;
			}
			break;
		}
		case 'center': {
			if (align === 'top' || align === 'bottom') {
				position.left = targetRect.left - (childRect.width / 2 - targetRect.width / 2) + scrollX;
			} else {
				position.top = targetRect.top - (childRect.height / 2 - targetRect.height / 2) + scrollY;
			}
			break;
		}
		case 'end': {
			if (align === 'top' || align === 'bottom') {
				position.left = targetRect.right - childRect.width + scrollX + margin;
			} else {
				position.top = targetRect.bottom - childRect.height + scrollY + margin;
			}
			break;
		}
	}

	return position;
}

export { getAlignment, getPosition };
