import { isHTMLElement, isNonNullable, NOT } from '../../utils';

const SELECTOR_OPTION = '[role="option"]';
const SELECTOR_SELECTED = '[aria-selected="true"]';
const SELECTOR_DISABLED = '[aria-disabled="true"]';

const FOCUSED_CLASS = 'focused';

function getOptionElements(listboxElement: HTMLUListElement, selector: string = '') {
	return [...listboxElement.querySelectorAll<HTMLLIElement>(SELECTOR_OPTION + selector)];
}

function getFocusedOptionElement(listboxElement: HTMLUListElement, selector: string = '') {
	return listboxElement.querySelector<HTMLLIElement>(SELECTOR_OPTION + '.' + FOCUSED_CLASS + selector);
}

function getSelectedOptionElement(listboxElement: HTMLUListElement, selector: string = '') {
	return listboxElement.querySelector<HTMLLIElement>(SELECTOR_OPTION + SELECTOR_SELECTED + selector);
}

function removeFocusClassOfOption(option: HTMLElement | null | undefined) {
	option?.classList?.remove(FOCUSED_CLASS);
}

function addFocusClassToOption(option: HTMLElement | null | undefined) {
	option?.classList?.add(FOCUSED_CLASS);
}

function setSelectedOnOption(option: HTMLElement | null | undefined, selected: boolean) {
	option?.setAttribute('aria-selected', selected.toString());
}

/**
 * @param {HTMLUListElement} listboxElement
 * @param {'first' | 'last' | 'prev' | 'next'} direction
 * @returns {string | undefined} id of newly focused option if any.
 */
function move(listboxElement: HTMLUListElement, direction: 'first' | 'last' | 'prev' | 'next'): string | undefined {
	const focused = getFocusedOptionElement(listboxElement) ?? getSelectedOptionElement(listboxElement);
	const options = getOptionElements(listboxElement, NOT(SELECTOR_DISABLED));

	removeFocusClassOfOption(focused);

	let option: HTMLLIElement | undefined;

	const index = options.findIndex(function (option) {
		return (option === focused);
	});

	switch (direction) {
		case 'first':
			option = options.at(0);
			break;
		case 'last':
			option = options.at(options.length - 1);
			break;
		case 'next':
			option = options.at((index + 1) % options.length);
			break;
		case 'prev':
			option = options.at((index === -1) ? index : index - 1);
			break;
	}

	addFocusClassToOption(option);

	return option?.id;
}

function findOptionByChar(listboxElement: HTMLUListElement, char: string) {
	const focused = getFocusedOptionElement(listboxElement);
	let options = getOptionElements(listboxElement, NOT(SELECTOR_DISABLED));

	if (isHTMLElement(focused) && isNonNullable(focused)) {
		const index = options.findIndex(function (option) {
			return (option === focused);
		});

		options.unshift(...options.slice(index + 1));
	}

	const option = options.find(function (option) {
		return (option.innerText[0] === char);
	});

	if (!isHTMLElement(option)) {
		return;
	}

	removeFocusClassOfOption(focused);
	addFocusClassToOption(option);
}

export {
	SELECTOR_OPTION,
	SELECTOR_SELECTED,
	SELECTOR_DISABLED,
	FOCUSED_CLASS,
	getOptionElements,
	getFocusedOptionElement,
	getSelectedOptionElement,
	removeFocusClassOfOption,
	addFocusClassToOption,
	setSelectedOnOption,
	move,
	findOptionByChar,
};
