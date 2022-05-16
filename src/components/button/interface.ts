import type { ButtonHTMLAttributes, ReactElement } from 'react';

type Base = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonType = 'primary' | 'secondary' | 'invisible' | 'link';

type ButtonShape = 'default' | 'round' | 'pill' | 'circle';

interface ButtonProps extends Omit<Base, 'type'> {
	readonly icon?: ReactElement;
	readonly suffix?: ReactElement;
	readonly shape?: ButtonShape | undefined;
	readonly type?: ButtonType | undefined;
	readonly htmlType?: Base['type'];
}

export { ButtonProps, ButtonType, ButtonShape };
