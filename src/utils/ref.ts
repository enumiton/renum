import type { ForwardedRef, MutableRefObject } from 'react';
import { isNonNullable } from './is';

function duplicateRef<T>(...refs: (ForwardedRef<T> | MutableRefObject<T>)[]) {
	return function (ref: T) {
		for (const dupe of refs) {
			if (typeof dupe === 'function') {
				dupe(ref);
			} else if (isNonNullable(dupe)) {
				dupe.current = ref;
			}
		}
	};
}

export { duplicateRef };
