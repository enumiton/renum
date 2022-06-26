import { isHTMLElement, isNode } from './is';

type El = HTMLElement | Node | Element | EventTarget | undefined | null;

function contains(target: El, containers: El | El[]): boolean {
	if (!isNode(target)) {
		return false;
	}

	if (!Array.isArray(containers)) {
		if (isHTMLElement(containers)) {
			return containers.contains(target);
		}

		return false;
	}

	for (const container of containers) {
		if (isHTMLElement(container)) {
			return container.contains(target);
		}
	}

	return false;
}

export { contains };
