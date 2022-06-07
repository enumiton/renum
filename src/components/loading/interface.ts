import type { IconProps } from '../icon';

interface LoadingProps extends Omit<IconProps, 'children'> {
	readonly active?: boolean | undefined;
}

export type { LoadingProps };
