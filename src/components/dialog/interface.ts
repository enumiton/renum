import type { HTMLAttributes, ReactElement } from 'react';

interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'aria-modal'> {
	/** @default false */
	readonly open?: boolean | undefined;
	readonly title: string;
	/**
	 * @default false
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role
	 * */
	readonly alert?: boolean | undefined;
	/**
	 * @default true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-modal
	 * */
	readonly modal?: boolean | undefined;
	/**
	 * Does not apply when `modal` is `false` or `closeable` is `false`.
	 *
	 * @default true
	 * */
	readonly backdropCloseable?: boolean | undefined;
	/**
	 * Disables closing by clicking the backdrop, close button or pressing escape. Forcing the user to make a choice.
	 *
	 * @default true
	 * */
	readonly closeable?: boolean | undefined;
	/** @default true */
	readonly footer?: boolean | ReactElement | ReactElement[] | undefined;
	readonly onClose?: (() => any) | undefined;
	readonly onConfirm?: (() => any) | undefined;
	readonly onCancel?: (() => any) | undefined;
}

/** @internal */
interface DialogHeaderProps extends Pick<DialogProps, 'closeable' | 'title'> {
	readonly prefixCls: string;
	readonly titleId: string;
	readonly close?: (() => any) | undefined;
}

/** @internal */
interface DialogFooterProps extends Pick<DialogProps, 'footer' | 'onConfirm'> {
	readonly prefixCls: string;
	readonly close?: (() => any) | undefined;
}

export type { DialogProps, DialogHeaderProps, DialogFooterProps };
