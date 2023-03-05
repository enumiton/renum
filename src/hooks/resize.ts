import type { DependencyList } from 'react';
import { useEffect } from 'react';

export type ResizeHandler = ((e: UIEvent) => void);

const listeners = new Set<ResizeHandler>();

window.addEventListener('resize', handle);

function handle(e: UIEvent) {
	if (listeners.size <= 0) {
		return;
	}

	for (const cb of listeners) {
		cb(e);
	}
}

function useResize(cb: ResizeHandler, deps: DependencyList = []) {
	useEffect(function () {
		listeners.add(cb);

		return function () {
			listeners.delete(cb);
		};
	}, deps);
}

export { useResize };
