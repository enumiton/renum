import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement } from 'react';

type Base = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonType = 'default' | 'primary' | 'complementary' | 'light' | 'invisible' | 'ghost';

type ButtonShape = 'default' | 'round' | 'pill' | 'circle';

interface ButtonProps extends Omit<Base, 'type' | 'children'> {
	readonly icon?: ReactElement | undefined;
	readonly suffix?: ReactElement | undefined;
	/** @default 'default' */
	readonly shape?: ButtonShape | undefined;
	/** @default 'default' */
	readonly type?: ButtonType | undefined;
	/** @default 'button' */
	readonly htmlType?: Base['type'];
	/** @default false */
	readonly dashed?: boolean | undefined;
	/** @default false */
	readonly loading?: boolean | undefined;
	/** @default false */
	readonly block?: boolean | undefined;
	readonly children?: string | number | boolean | null | undefined;
}

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
}

export type { ButtonProps, ButtonType, ButtonShape, ButtonGroupProps };
