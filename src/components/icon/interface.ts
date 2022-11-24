import type { ReactElement, SVGAttributes } from 'react';

interface IconProps extends Omit<SVGAttributes<SVGElement>, 'children'> {
	readonly children: ReactElement;
}

export type { IconProps };
