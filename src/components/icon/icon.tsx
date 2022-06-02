import { cloneElement, forwardRef } from "react";
import { classNames } from "../../utils";
import { useConfigProvider } from "../renum-provider";
import type { IconProps } from "./interface";

const Icon = forwardRef<HTMLSpanElement, IconProps>(function (props, ref) {
	const { prefixCls } = useConfigProvider();

	return (
		<span
			ref={ ref }
			className={ classNames(prefixCls + '-icon', props.className) }
		>
			{ cloneElement(props.children, props) }
		</span>
	);
});

export { Icon };
