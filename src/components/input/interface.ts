import type { CSSProperties, InputHTMLAttributes, ReactElement } from "react";

type Base = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<Base, 'prefix'> {
	readonly icon?: ReactElement | undefined;
	readonly prefix?: ReactElement | string | number | null | undefined;
	readonly suffix?: ReactElement | string | number | null | undefined;
	readonly borderless?: boolean | undefined;
	readonly clearable?: boolean | undefined;
	readonly onClear?: (() => void);
	readonly wrapperClassName?: string | undefined;
	readonly wrapperStyle?: CSSProperties | undefined;
	readonly htmlPrefix?: Base['prefix'];
}

export type { InputProps };
