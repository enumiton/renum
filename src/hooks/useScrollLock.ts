import { useRef } from 'react';

let locked = false;

function useScrollLock() {
	const scroll = useRef(0);

	const html = window.document.documentElement;
	const body = window.document.body;

	function lock() {
		if (locked) {
			return;
		}

		locked = true;
		scroll.current = window.scrollY;

		let scrollbar = (window.innerWidth - body.clientWidth);

		html.style.minHeight = `calc(${ window.innerHeight }px)`;

		body.style.position = 'fixed';
		body.style.overflow = 'hidden';

		body.style.inset = '0px';
		body.style.top = `-${ scroll.current }px`;

		body.style.width = '100%';
		body.style.height = '100%';

		body.style.paddingRight = `${ scrollbar }px`;
	}

	function unlock() {
		if (!locked) {
			return;
		}

		locked = false;

		html.style.minHeight = '';

		body.style.position = '';
		body.style.overflow = '';

		body.style.inset = '';
		body.style.top = '';

		body.style.width = '';
		body.style.height = '';

		body.style.paddingRight = '';

		window.scrollTo({
			top: scroll.current,
			left: 0,
			behavior: 'auto',
		});
	}

	return {
		locked,
		lock,
		unlock,
	};
}

export { useScrollLock };
