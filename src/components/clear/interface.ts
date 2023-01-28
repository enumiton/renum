import type { HTMLAttributes, ReactElement } from 'react';

interface ClearProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
	readonly icon?: ReactElement | undefined;
}

export type { ClearProps };
