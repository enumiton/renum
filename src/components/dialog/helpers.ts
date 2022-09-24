import { clamp, isHTMLElement } from '../../utils';

const enum TabDirection {
	Forward = +1,
	Backward = -1,
}

function handleFocus(direction: TabDirection, e: KeyboardEvent, portal: HTMLDivElement | null) {
	const dialog = portal?.firstElementChild;

	if (!isHTMLElement(dialog)) {
		return;
	}

	e.preventDefault();

	const elements = [...dialog.querySelectorAll('button, a, area, input, textarea, select, [tabindex], [contenteditable]')] as HTMLElement[];
	const active = window.document.activeElement;

	if (elements.length === 0) {
		dialog.focus();
		return;
	}

	if (!isHTMLElement(active)) {
		(elements[0])?.focus();
		return;
	}

	const current = clamp(elements.findIndex((el) => el === active), -1, elements.length - 1);

	let next = (current === -1 && direction === TabDirection.Backward)
		? current
		: current + direction;

	elements.at(next >= elements.length ? 0 : next)?.focus();
}

export { handleFocus, TabDirection };
