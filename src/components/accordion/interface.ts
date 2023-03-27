import type { CSSProperties, HTMLAttributes, ReactElement, ReactFragment } from 'react';

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	readonly children: ReactElement | ReactFragment;
}

interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	readonly open?: boolean | undefined;
	/** @default 'h3' */
	readonly heading?: Headings;
	readonly icon?: ReactElement | undefined;
	readonly disabled?: boolean | undefined;
	readonly title: ReactElement | string | number | boolean;
	readonly titleClassName?: string | undefined;
	readonly titleStyle?: CSSProperties | undefined;
	readonly buttonClassName?: string | undefined;
	readonly buttonStyle?: CSSProperties | undefined;
}

export type { AccordionProps, AccordionItemProps, Headings };
