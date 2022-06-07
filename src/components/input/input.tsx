import { forwardRef } from "react";
import { classNames } from "../../utils";
import { useConfigProvider } from "../renum-provider";
import type { InputProps } from "./interface";

const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref) {
	const {
		icon,
		htmlPrefix,
		prefix,
		suffix,
		borderless,
		wrapperStyle,
		wrapperClassName,
		...rest
	} = props;

	const { prefixCls } = useConfigProvider();

	return (
		<div
			style={ wrapperStyle }
			className={ classNames(prefixCls + '-input-wrapper', {
				[`${ prefixCls }-input-wrapper-prefix`]: !!prefix,
				[`${ prefixCls }-input-wrapper-suffix`]: !!suffix,
			}, wrapperClassName) }
		>
			{ !!prefix ? (
				<div className={ prefixCls + '-input-prefix' }>
					{ prefix }
				</div>
			) : null }
			<div className={ prefixCls + '-input-inner' }>
				{ icon }
				<input
					{ ...rest }
					prefix={ htmlPrefix }
					ref={ ref }
					className={ classNames(prefixCls + '-input', {
						[`${ prefixCls }-input-icon`]: !!icon,
						[`${ prefixCls }-input-borderless`]: !!borderless,
					}, props.className) }
				/>
			</div>
			{ !!suffix ? (
				<div className={ prefixCls + '-input-suffix' }>
					{ suffix }
				</div>
			) : null }
		</div>
	);
});

export { Input };
