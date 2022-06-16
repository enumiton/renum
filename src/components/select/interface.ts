import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactElement } from 'react';

type SelectValue = string | number | undefined;

interface SelectProps<T = SelectValue> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value' | 'onChange'> {
	readonly icon?: ReactElement | undefined;
	readonly value?: T;
	readonly onChange?: ((value: T) => void) | undefined;
}

export type { SelectProps, SelectValue };
