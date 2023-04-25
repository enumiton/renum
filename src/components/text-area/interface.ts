import type { TextareaHTMLAttributes } from 'react';

type Resize = boolean | 'block' | 'inline' | 'both';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	/** @default false */
	readonly autoResize?: boolean | undefined;
	/** @default 'block' */
	readonly resize?: Resize;
}

export type { TextAreaProps };
