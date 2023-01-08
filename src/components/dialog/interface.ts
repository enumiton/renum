import type { DialogHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';

type Base = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'role' | 'title'>;

type DialogTitle = string | ((titleId: string) => ReactNode) | undefined;

interface DialogTitleProp {
	/** When providing no title use the `aria-label` attribute! */
	readonly title: string | ((titleId: string) => ReactNode);
}

interface DialogProps extends Base {
	/**
	 * @default 'dialog'
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role
	 * */
	readonly role?: 'dialog' | 'alertdialog';
	/**
	 * Does not apply on non-modals nor when `closeable` is `false`.
	 *
	 * @default true
	 * */
	readonly backdropCloseable?: boolean | undefined;
	readonly closeable?: boolean | undefined;
	/**
	 * @default true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal
	 * */
	readonly modal?: boolean | undefined;
	/**
	 * Enables fullscreen mode on smaller devices for a better experience.
	 *
	 * @default true
	 */
	readonly fullscreen?: boolean | undefined;
}

interface DialogConfirmProps extends Base, DialogTitleProp {
	readonly actions: ReactElement | ReactElement[];
	/**	@default false */
	readonly stacked?: boolean | undefined;
}

interface DialogModalProps extends Omit<DialogProps, 'role' | 'modal'>, DialogTitleProp {
	readonly footer?: ReactNode | undefined;
	readonly onConfirm?: (() => any) | undefined;
}

interface DialogHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, DialogTitleProp {
	readonly titleId: string;
	readonly showClose?: boolean | undefined;
}

interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
}

interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
	readonly onCancel?: (() => any) | undefined;
	readonly onConfirm?: (() => any) | undefined;
}

export type {
	DialogProps,
	DialogConfirmProps,
	DialogModalProps,
	DialogHeaderProps,
	DialogBodyProps,
	DialogFooterProps,
	DialogTitle,
};
