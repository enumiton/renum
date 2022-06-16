import type { CSSProperties, ReactElement } from 'react';
import type { PortalProps } from '../portal';

interface OverlayProps extends Omit<PortalProps, 'target'> {
	readonly content: ReactElement;
	readonly portalClassName?: string | undefined;
	readonly portalStyle?: CSSProperties | undefined;
}

export type { OverlayProps };
