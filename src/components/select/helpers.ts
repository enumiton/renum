const ARIA_SELECTED = '[aria-selected="true"]';
const ARIA_DISABLED = '[aria-disabled="true"]';

function NOT(selector: string): string {
	return ':not(' + selector + ')';
}

const enum Direction {
	Next = +1,
	Next10 = +10,
	Prev = -1,
	Prev10 = -10,
	Start = 2,
	End = 3,
}

const enum OptionState {
	None,
	Hovered,
	Selected,
	Disabled,
}

export {
	ARIA_SELECTED,
	ARIA_DISABLED,
	NOT,
	Direction,
	OptionState,
};
