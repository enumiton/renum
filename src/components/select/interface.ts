import type { ButtonHTMLAttributes, CSSProperties, ReactElement } from 'react';
import type { PortalProps } from '../portal';

type SelectValue = string | number | undefined;

interface SelectOption<T = SelectValue> {
	readonly value: T;
	readonly label: string | number;
	/** @description Use to give a more descriptive label to screen readers */
	readonly ariaLabel?: string | undefined;
	/** @default false */
	readonly disabled?: boolean | undefined;
	readonly icon?: ReactElement | undefined;
}

type SelectOptions<T = SelectValue> = SelectOption<T>[];

interface SelectProps<T = SelectValue> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
	readonly icon?: ReactElement | undefined;
	readonly value?: T;
	readonly defaultValue?: T;
	readonly options: SelectOptions<T>;
	readonly onChange?: ((value: T) => void) | undefined;
	/** @default true */
	readonly clearable?: boolean | undefined;
	readonly placement?: PortalProps['align'] | undefined;
	readonly wrapperClassName?: string | undefined;
	readonly wrapperStyle?: CSSProperties | undefined;
}

export type { SelectProps, SelectOptions, SelectOption, SelectValue };

