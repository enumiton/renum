import { RefObject, useEffect } from 'react';
import { getKey, isHTMLElement, Key } from '../utils';

interface KeyDownListenerOptions {
	readonly preventDefault?: boolean | undefined;
	readonly stopPropagation?: boolean | undefined;
}

function useKeyDownListener<T extends HTMLElement>(
	ref: RefObject<T>,
	cbs: Partial<Record<Key, ((e: KeyboardEvent, target: T) => void)>>,
	options?: KeyDownListenerOptions,
) {
	function handleKeyDown(e: KeyboardEvent) {
		const key = getKey(e.key);

		if (key in cbs) {
			if (options?.preventDefault) {
				e.preventDefault();
			}

			if (options?.stopPropagation) {
				e.preventDefault();
			}

			if (!ref.current) {
				throw new Error('[Renum/useKeyDownListener]: target is null');
			}

			cbs?.[key]?.(e, ref.current);
		}
	}

	useEffect(function () {
		const target = ref.current;

		if (!isHTMLElement(target)) {
			return;
		}

		target.addEventListener('keydown', handleKeyDown);

		return function () {
			target.removeEventListener('keydown', handleKeyDown);
		};
	}, []);
}

export { useKeyDownListener };
export type { KeyDownListenerOptions };
