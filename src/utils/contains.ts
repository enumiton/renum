import { isHTMLElement, isNode } from './is';

type Elementish = HTMLElement | Node | Element | EventTarget | undefined | null;

function contains(target: Elementish, containers: Elementish | Elementish[]): boolean {
	if (!isNode(target)) {
		return false;
	}

	if (!Array.isArray(containers)) {
		return isHTMLElement(containers) && containers.contains(target);
	}

	for (const container of containers) {
		if (isHTMLElement(container) && container.contains(target)) {
			return true;
		}
	}

	return false;
}

export { contains };
