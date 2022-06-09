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

	const { prefixCls } = useConfigProvider();

	function fix(name: 'prefix' | 'suffix', value: InputProps['prefix']) {
		if (!value) {
			return null;
		}

		const classes = classNames(prefixCls + '-input-' + name, {
			[`${ prefixCls }-input-${ name }-text`]: !isValidElement(value),
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
			className={ classNames(prefixCls + '-input-wrapper', {
				[`${ prefixCls }-input-wrapper-prefix`]: !!prefix,
				[`${ prefixCls }-input-wrapper-suffix`]: !!suffix,
			}, wrapperClassName) }
		>
			{ fix('prefix', prefix) }
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
			{ fix('suffix', suffix) }
		</div>
	);
});

export { Input };
