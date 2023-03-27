import { createElement, forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { AccordionItemProps } from './interface.js';
import { useRenumProvider } from '../renum-provider/index.js';
import { $, Key } from '../../utils/index.js';
import { default as ChevronDown } from '../../icons/ChevronDown.js';
import { useKeyDownListener } from '../../hooks/index.js';
import { move } from './helpers.js';

const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(props, ref) {
	const {
		id = useId(),
		open: _open,
		heading = 'h3',
		icon,
		disabled,
		title,
		titleClassName,
		titleStyle,
		buttonClassName,
		buttonStyle,
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('accordion');

	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const regionId = id + '-region';

	function handleClick() {
		setOpen((v) => !v);
	}

	useKeyDownListener(buttonRef, {
		[Key.Down]: move(+1, prefixCls),
		[Key.Up]: move(-1, prefixCls),
		[Key.Home]: move('first', prefixCls),
		[Key.End]: move('last', prefixCls),
	}, { preventDefault: true, stopPropagation: true });

	useEffect(function () {
		if (_open !== undefined && _open !== open) {
			setOpen(_open);
		}
	}, [_open]);

	return (
		<div
			{ ...rest }
			className={ $(`${ prefixCls }-item`, rest.className) }
			ref={ ref }
		>
			{ createElement(heading, {
				id,
				className: $(`${ prefixCls }-title`, titleClassName),
				style: titleStyle,
				children: (
					<button
						type="button"
						onClick={ handleClick }
						aria-expanded={ open }
						aria-controls={ regionId }
						disabled={ disabled }
						aria-disabled={ disabled }
						className={ $(`${ prefixCls }-button`, buttonClassName) }
						style={ buttonStyle }
						ref={ buttonRef }
					>
						{ icon }
						<span className={ `${ prefixCls }-text` }>
							{ title }
						</span>
						<ChevronDown className={ `${ prefixCls }-icon` } />
					</button>
				),
			}) }
			<div
				role="region"
				id={ regionId }
				aria-labelledby={ id }
				className={ $(`${ prefixCls }-region`) }
				hidden={ !open }
			>
				{ children }
			</div>
		</div>
	);
});

export { Item };
