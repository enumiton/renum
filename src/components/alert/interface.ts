import type { HTMLAttributes, ReactElement } from 'react';

type AlertType = 'light' | 'primary' | 'info' | 'success' | 'danger' | 'error';

type AlertRole = 'presentation' | 'status' | 'alert';

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
	/** @default true */
	readonly icon?: ReactElement | boolean | undefined;
	/** @default 'light' */
	readonly type?: AlertType | undefined;
	readonly banner?: boolean | undefined;
	/**
	 * @default 'presentation'
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions}
	 * */
	readonly role?: AlertRole | undefined;
	readonly title?: string | undefined;
	readonly actions?: ReactElement | ReactElement[] | undefined;
	/** @default false */
	readonly closeable?: boolean | undefined;
}

export type { AlertProps };
