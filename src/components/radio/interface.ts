import type { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	readonly label?: string | number | undefined;
	readonly wrapperClassName?: string | undefined;
}

export type { RadioProps };
