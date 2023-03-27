import { isHTMLButtonElement, isHTMLElement } from '../../utils/index.js';

function move(amount: number | 'first' | 'last', prefixCls: string) {
	return function (_: KeyboardEvent, el: HTMLButtonElement) {
		const container = el?.closest('.' + prefixCls);

		if (!isHTMLButtonElement(el) || !isHTMLElement(container)) {
			return;
		}

		const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>(`button.${ prefixCls }-button:not(:disabled)`));
		let index: number;

		if (typeof amount === 'number') {
			index = buttons.findIndex(function (button) {
				return (button === el);
			});

			index = (index + amount) % buttons.length;
		} else {
			index = (amount === 'last') ? buttons.length - 1 : 0;
		}

		buttons.at(index)?.focus();
	};
}

export { move };
