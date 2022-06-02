import type { ButtonHTMLAttributes, ReactElement } from 'react';

type Base = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonType = 'default' | 'primary' | 'complementary' | 'light' | 'invisible' | 'ghost';

type ButtonShape = 'default' | 'round' | 'pill' | 'circle';

interface ButtonProps extends Omit<Base, 'type'> {
	readonly icon?: ReactElement;
	readonly suffix?: ReactElement;
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
}

export { ButtonProps, ButtonType, ButtonShape };
