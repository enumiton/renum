import { cloneElement, forwardRef } from "react";
import { classNames } from "../../utils";
import { useConfigProvider } from "../renum-provider";
import type { IconProps } from "./interface";

const Icon = forwardRef<HTMLSpanElement, IconProps>(function (props, ref) {
	const {
		className,
		children,
		...rest
	} = props;

	const { prefixCls } = useConfigProvider();
	console.log('fdsa');

	return (
		<span
			ref={ ref }
			className={ classNames(prefixCls + '-icon', className) }
		>
			{ cloneElement(children, rest) }
		</span>
	);
});

export { Icon };
