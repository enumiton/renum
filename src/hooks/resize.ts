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
	console.table(listeners);
	for (const [, cb] of listeners) {
		cb(e);
	}
}

function useResize(cb: ResizeHandler) {
	const id = useRef<number>();

	useEffect(function () {
		id.current = add(cb);
		console.log('add', id.current);

		return function () {
			console.log('remove', id.current);
			if (id.current !== undefined) {
				remove(id.current);
			}
		};
	}, []);
}

export { useResize };
