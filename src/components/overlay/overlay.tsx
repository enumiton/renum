import { useRef } from 'react';
import { Portal } from '../portal';
import type { OverlayProps } from './interface';

function Overlay(props: OverlayProps) {
	const {
		className,
		style,
		portalClassName,
		portalStyle,
		content,
		children,
		...rest
	} = props;

	const target = useRef<HTMLDivElement>(null);

	return (
		<div ref={ target } className={ className } style={ style }>
			{ children }
			<Portal
				{ ...rest }
				target={ target }
				className={ portalClassName }
				style={ portalStyle }
			>
				{ content }
			</Portal>
		</div>
	);
}

export { Overlay };
