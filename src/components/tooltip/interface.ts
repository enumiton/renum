import type { HTMLAttributes, ReactElement } from 'react';
import type { PortalAlign, PortalAlignOffset } from '../portal';

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	readonly label: string | number;
	readonly icon?: ReactElement | undefined;
	/**
	 * When `true` it uses the `aria-labelledby` attributed rather than the `aria-describedby` attribute
	 * @default false
	 */
	readonly primaryLabel?: boolean | undefined;
	/** @default ['bottom', 'center'] */
	readonly align?: [PortalAlign, PortalAlignOffset] | undefined;
	readonly children: ReactElement;
}

export type { TooltipProps };
