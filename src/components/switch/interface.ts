import type { ChangeEvent, InputHTMLAttributes } from 'react';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'checked' | 'defaultChecked' | 'onChange'> {
	readonly defaultValue?: boolean | undefined;
	readonly value?: boolean | undefined;
	readonly disabled?: boolean | undefined;
	readonly onChange?: ((value: boolean, e: ChangeEvent<HTMLInputElement>) => void) | undefined;
}

export type { SwitchProps };
