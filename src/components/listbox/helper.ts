import type { BaseSyntheticEvent } from 'react';
import { contains, isHTMLElement } from '../../utils';

function cancelEvents(e: BaseSyntheticEvent) {
	e.preventDefault();
	e.stopPropagation();
}

function getOptionElements(listboxElement: HTMLUListElement, selector: string = '') {
	return [...listboxElement.querySelectorAll<HTMLLIElement>('[role="option"]' + selector)];
}

function getSelectedOptionElement(listboxElement: HTMLUListElement, selector: string = '') {
	return listboxElement.querySelector<HTMLLIElement>('[role="option"][aria-selected="true"]' + selector);
}

function move(listboxElement: HTMLUListElement, direction: 'first' | 'last' | 'prev' | 'next') {
	const current = window.document.activeElement;
	const options = getOptionElements(listboxElement);

	if (!listboxElement.contains(current)) {
		return options.at(0)?.focus();
	}

	if (direction === 'first') {
		return options.at(0)?.focus();
	} else if (direction === 'last') {
		return options.at(options.length - 1)?.focus();
	}

	let index = options.findIndex(function (option) {
		return (option === current);
	});

	if (direction === 'next') {
		options.at((++index >= options.length) ? 0 : index)?.focus();
	} else {
		options.at(--index)?.focus();
	}
}

function focusIn(listboxElement: HTMLUListElement, e: FocusEvent) {
	if (contains(e.relatedTarget, listboxElement)) {
		return;
	}

	const selectedOption = getSelectedOptionElement(listboxElement);

	if (isHTMLElement(selectedOption)) {
		selectedOption.focus();
	}

	setTabIndexOnOptions(listboxElement, '-1');
}

function focusOut(listboxElement: HTMLUListElement, e: FocusEvent) {
	if (contains(e.relatedTarget, listboxElement)) {
		return;
	}

	setTabIndexOnOptions(listboxElement, '0');
}

function setTabIndexOnOptions(listboxElement: HTMLUListElement, value: '0' | '-1') {
	const options = getOptionElements(listboxElement);

	for (const option of options) {
		option.setAttribute('tabindex', value);
	}
}

export { cancelEvents, getOptionElements, move, focusIn, focusOut };
