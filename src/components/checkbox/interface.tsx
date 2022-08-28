import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	readonly label?: ReactNode;
	readonly wrapperClassName?: string | undefined;
	readonly labelClassName?: string | undefined;
}

export type { CheckboxProps };
