import { forwardRef, isValidElement } from 'react';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { InputProps } from './interface';

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

	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('input');

	function addon(name: 'prefix' | 'suffix', value: InputProps['prefix']) {
		if (!value) {
			return null;
		}

		const classes = classNames(`${ prefixCls }-${ name }`, {
			[`${ prefixCls }-${ name }-text`]: !isValidElement(value),
		});

		return (
			<span className={ classes }>
				{ value }
			</span>
		);
	}

	return (
		<div
			style={ wrapperStyle }
			className={ classNames(prefixCls + '-wrapper', {
				[`${ prefixCls }-wrapper-prefix`]: !!prefix,
				[`${ prefixCls }-wrapper-suffix`]: !!suffix,
			}, wrapperClassName) }
		>
			{ addon('prefix', prefix) }
			<div className={ prefixCls + '-inner' }>
				{ icon }
				<input
					{ ...rest }
					prefix={ htmlPrefix }
					ref={ ref }
					className={ classNames(prefixCls, {
						[`${ prefixCls }-icon`]: !!icon,
						[`${ prefixCls }-borderless`]: !!borderless,
					}, props.className) }
				/>
			</div>
			{ addon('suffix', suffix) }
		</div>
	);
});

export { Input };
