import type { CSSProperties, HTMLAttributes, PropsWithRef, ReactNode, RefObject } from 'react';

type PortalAlign = 'top' | 'right' | 'bottom' | 'left';
type PortalAlignOffset = 'start' | 'center' | 'end';

interface PortalProps extends PropsWithRef<Pick<HTMLAttributes<HTMLDivElement>, 'onClick'>> {
	readonly key?: string | null | undefined;
	readonly className?: string | undefined;
	readonly hidden?: boolean | undefined;
	readonly style?: CSSProperties | undefined;
	readonly target?: RefObject<HTMLElement> | undefined;
	readonly container?: Element | undefined;
	/** @default ['bottom', 'center'] */
	readonly align?: [PortalAlign, PortalAlignOffset] | undefined;
	readonly children: ReactNode;
}

interface PortalPosition {
	top: number | undefined;
	right: number | undefined;
	bottom: number | undefined;
	left: number | undefined;
	width?: number;
	minWidth?: number;
	height?: number;
	minHeight?: number;
}

export type { PortalProps, PortalPosition, PortalAlign, PortalAlignOffset };
