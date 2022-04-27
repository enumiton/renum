import type { ButtonProps } from './interface';

function Button(props: ButtonProps) {
	return (
		<button { ...props }>
			Button
		</button>
	);
}

export { Button };
