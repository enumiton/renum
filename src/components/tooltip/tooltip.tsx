import { cloneElement, forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { TooltipProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { Portal } from '../portal';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function (props, ref) {
	const {
		label,
		icon,
		primaryLabel = false,
		align = ['bottom', 'center'],
		children,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('tooltip');

	const [hidden, setHidden] = useState(true);
	const target = useRef<HTMLElement | null>(null);
	const id = rest.id || useId();

	const child = cloneElement(children, {
		[primaryLabel ? 'aria-labelledby' : 'aria-describedby']: id,
		ref: target,
	});

	function show() {
		setHidden(false);
	}

	function hide() {
		setHidden(true);
	}

	useEffect(function () {
		const el = target.current;

		if (el) {
			el.addEventListener('mouseover', show);
			el.addEventListener('mouseleave', hide);

			el.addEventListener('touchstart', show);
			el.addEventListener('touchend', hide);

			el.addEventListener('focusin', show);
			el.addEventListener('focusout', hide);
		}

		return function () {
			if (el) {
				el.removeEventListener('mouseover', show);
				el.removeEventListener('mouseleave', hide);

				el.removeEventListener('touchstart', show);
				el.removeEventListener('touchend', hide);

				el.removeEventListener('focusin', show);
				el.removeEventListener('focusout', hide);
			}
		};
	}, []);

	return (
		<>
			{ child }
			<Portal
				target={ target }
				hidden={ hidden }
				align={ align }
				className={ `${ prefixCls }-portal` }
			>
				<div
					{ ...rest }
					id={ id }
					role="tooltip"
					className={ prefixCls }
					ref={ ref }
				>
					{ icon }{ label }
				</div>
			</Portal>
		</>
	);
});

export { Tooltip };
