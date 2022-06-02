import { isString } from './is';

function classNames(...classes: (Record<string, boolean> | string | undefined)[]): string {
	let str = [];

	for (const item of classes) {
		if (!item) {
			continue;
		}

		if (isString(item)) {
			str.push(item);
			continue;
		}

		Object.entries(item).forEach(function ([key, value]) {
			if (value) {
				str.push(key);
			}
		});
	}

	return str.join(' ');
}

export { classNames };
