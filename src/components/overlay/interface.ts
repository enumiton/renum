import type { CSSProperties, ReactNode } from 'react';
import type { PortalProps } from '../portal';

interface OverlayProps extends Omit<PortalProps, 'target'> {
	readonly content: ReactNode;
	readonly portalClassName?: string | undefined;
	readonly portalStyle?: CSSProperties | undefined;
}

export type { OverlayProps };
