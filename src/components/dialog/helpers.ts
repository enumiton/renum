function bodyIsLocked() {
	return (window.document.body.style.position === 'fixed' && window.document.body.style.overflow === 'hidden');
}

function getOpenDialogs() {
	return [...window.document.querySelectorAll('dialog[open]:not([hidden], [hidden="true"])')];
}

function lockBody() {
	if (bodyIsLocked()) {
		return;
	}

	const body = window.document.body;

	const scrollbarWidth = (window.innerWidth - body.clientWidth);

	body.style.top = '-' + window.scrollY + 'px';
	body.style.left = '-' + window.scrollX + 'px';
	body.style.position = 'fixed';
	body.style.width = '100%';
	body.style.height = '100%';
	body.style.overflow = 'hidden';
	body.style.paddingRight = scrollbarWidth + 'px';
}

function unlockBody() {
	if (!bodyIsLocked() || getOpenDialogs().length > 1) {
		return;
	}

	const body = window.document.body;

	const top = Number.parseInt(body.style.top);
	const left = Number.parseInt(body.style.left);

	body.style.position = '';
	body.style.top = '';
	body.style.left = '';
	body.style.width = '';
	body.style.height = '';
	body.style.overflow = '';
	body.style.paddingRight = '';

	window.scrollTo({
		top: (Number.isNaN(top) ? 0 : Math.abs(top)),
		left: (Number.isNaN(left) ? 0 : Math.abs(left)),
		behavior: 'auto',
	});
}

function cancelAnimations(element: HTMLElement, options?: GetAnimationsOptions) {
	for (const animation of element.getAnimations(options)) {
		animation.cancel();
	}
}

export { lockBody, unlockBody, bodyIsLocked, getOpenDialogs, cancelAnimations };
