import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { AccordionProps } from './interface.js';
import { Item } from './item.js';
import { useRenumProvider } from '../renum-provider/index.js';
import { $ } from '../../utils/index.js';

interface Accordion extends ForwardRefExoticComponent<AccordionProps & RefAttributes<HTMLDivElement>> {
	Item: typeof Item;
}

const Accordion: Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(props, ref) {
	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('accordion');

	return (
		<div
			{ ...props }
			className={ $(prefixCls, props.className) }
			ref={ ref }
		>
			{ props.children }
		</div>
	);
}) as Accordion;

Accordion.Item = Item;

Object.freeze(Accordion);

export { Accordion };
