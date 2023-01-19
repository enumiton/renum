import type { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	readonly wrapperClassName?: string | undefined;
	readonly labelClassName?: string | undefined;
}

export type { RadioProps };
