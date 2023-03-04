import type { DependencyList } from 'react';
import { useEffect, useRef } from 'react';

type ResizeHandler = ((e: UIEvent) => void);

let _id = 0;
const listeners: Map<number, ResizeHandler> = new Map();

window.addEventListener('resize', handle);

function add(cb: ResizeHandler) {
	const id = _id++;

	listeners.set(id, cb);

	return id;
}

function remove(id: number) {
	listeners.delete(id);
}

function handle(e: UIEvent) {
	if (listeners.size <= 0) {
		return;
	}

	for (const [, cb] of listeners) {
		cb(e);
	}
}

function useResize(cb: ResizeHandler, deps: DependencyList = []) {
	const id = useRef<number>();

	useEffect(function () {
		id.current = add(cb);

		return function () {
			if (id.current !== undefined) {
				remove(id.current);
			}
		};
	}, deps);
}

export { useResize };
