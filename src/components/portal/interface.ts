import type { CSSProperties, HTMLAttributes, PropsWithRef, ReactNode, RefObject } from 'react';

type PortalAlignSide = 'top' | 'right' | 'bottom' | 'left';
type PortalAlignOffset = 'start' | 'center' | 'end';

type PortalAlign = `${ PortalAlignSide }-${ PortalAlignOffset }`;

interface PortalProps extends PropsWithRef<Pick<HTMLAttributes<HTMLDivElement>, 'onClick'>> {
	readonly key?: string | null | undefined;
	readonly className?: string | undefined;
	readonly hidden?: boolean | undefined;
	readonly style?: CSSProperties | undefined;
	readonly target?: RefObject<HTMLElement> | undefined;
	readonly container?: Element | undefined;
	/** @default 'bottom-center' */
	readonly align?: PortalAlign | undefined;
	/** @default false */
	readonly setWidth?: boolean | undefined;
	/** @default false */
	readonly setMinWidth?: boolean | undefined;
	/** @default false */
	readonly setHeight?: boolean | undefined;
	/** @default false */
	readonly setMinHeight?: boolean | undefined;
	readonly children: ReactNode;
}

interface PortalPosition {
	top: number;
	left: number;
	width?: number;
	height?: number;
}

export type { PortalProps, PortalPosition, PortalAlign, PortalAlignSide, PortalAlignOffset };
