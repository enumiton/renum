import { useEffect, useRef } from 'react';

function useMounted() {
	const mounted = useRef(false);

	useEffect(function () {
		if (!mounted.current) {
			mounted.current = true;
		}
	}, []);

	return mounted.current;
}

export { useMounted };
