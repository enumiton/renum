import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	readonly wrapperClassName?: string | undefined;
	readonly labelClassName?: string | undefined;
}

export type { CheckboxProps };
