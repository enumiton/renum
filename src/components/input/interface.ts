import type { CSSProperties, InputHTMLAttributes, ReactElement } from 'react';

type Base = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<Base, 'value' | 'defaultValue' | 'prefix'> {
	readonly icon?: ReactElement | undefined;
	readonly value?: string | number | undefined;
	readonly defaultValue?: string | number | undefined;
	readonly prefix?: ReactElement | string | number | null | undefined;
	readonly suffix?: ReactElement | string | number | null | undefined;
	/** @default false */
	readonly borderless?: boolean | undefined;
	/** @default true */
	readonly clearable?: boolean | undefined;
	readonly onClear?: (() => void);
	readonly wrapperClassName?: string | undefined;
	readonly wrapperStyle?: CSSProperties | undefined;
	readonly htmlPrefix?: Base['prefix'];
}

export type { InputProps };
