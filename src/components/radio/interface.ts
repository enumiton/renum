import type { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	readonly wrapperClassName?: string | undefined;
}

export type { RadioProps };
