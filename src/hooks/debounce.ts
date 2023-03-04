import { useRef } from 'react';

// @todo args
function useDebounce(cb: (() => void), timeout: number = 200) {
	const a = useRef<number>();

	return function () {
		if (a.current) {
			window.clearTimeout(a.current);
		}

		a.current = window.setTimeout(function () {
			cb();
		}, timeout);
	};
}

export { useDebounce };
