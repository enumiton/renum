import type { ReactElement, SVGAttributes } from "react";

type Base = SVGAttributes<SVGElement>;

interface IconProps extends Omit<Base, 'children'> {
	readonly children: ReactElement;
}

export type { IconProps };
