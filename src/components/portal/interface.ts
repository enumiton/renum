import type { CSSProperties, HTMLAttributes, PropsWithRef, ReactNode, RefObject } from 'react';

type PortalPosition = 'top' | 'right' | 'bottom' | 'left';

interface PortalProps extends PropsWithRef<Pick<HTMLAttributes<HTMLDivElement>, 'onClick'>> {
	readonly key?: string | null | undefined;
	readonly className?: string | undefined;
	readonly hidden?: boolean | undefined;
	readonly style?: CSSProperties | undefined;
	readonly target?: RefObject<HTMLElement> | undefined;
	readonly container?: Element | undefined;
	/** @default 'bottom' */
	readonly position?: PortalPosition | undefined;
	readonly children: ReactNode;
}

export type { PortalProps };
