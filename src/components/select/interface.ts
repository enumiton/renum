import type { ButtonHTMLAttributes, ReactElement } from 'react';

type SelectValue = string | number | undefined;

interface SelectOption<T = SelectValue> {
	readonly icon?: ReactElement | undefined;
	readonly label: string | number;
	/** @description Use to give a more descriptive label to screen readers */
	readonly aria?: string | undefined;
	readonly value: T;
}

type SelectOptions<T = SelectValue> = SelectOption<T>[];

interface SelectProps<T = SelectValue> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value' | 'onChange'> {
	readonly icon?: ReactElement | undefined;
	readonly value?: T;
	readonly options: SelectOptions<T>;
	readonly onChange?: ((value: T) => void) | undefined;
}

export type { SelectProps, SelectOptions, SelectOption, SelectValue };
