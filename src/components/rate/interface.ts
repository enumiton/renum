import type { FC, HTMLAttributes } from 'react';

interface RateProps extends HTMLAttributes<HTMLSpanElement> {
	/** @default 0 */
	readonly value?: number | undefined;
	/** @default 5 */
	readonly amount?: number | undefined;
	/** @default false */
	readonly hasHalves?: boolean | undefined;
	readonly icon?: FC | undefined;
	readonly formatter?: ((value: number) => string) | undefined;
}

export type { RateProps };
