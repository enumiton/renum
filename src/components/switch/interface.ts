import type { ButtonHTMLAttributes } from 'react';

interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue' | 'checked' | 'defaultChecked' | 'onChange'> {
	readonly defaultValue?: boolean | undefined;
	readonly value?: boolean | undefined;
	readonly disabled?: boolean | undefined;
	readonly onChange?: ((value: boolean) => void) | undefined;
}

export type { SwitchProps };
