import { FormEvent, forwardRef, isValidElement, useEffect, useRef, useState } from 'react';
import { classNames, isHTMLInputElement, isNullable } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { InputProps } from './interface';
import { Clear } from '../clear';

const Input = forwardRef<HTMLInputElement, InputProps>(function (props, ref) {
	const {
		value: _value,
		defaultValue,
		icon,
		htmlPrefix,
		prefix,
		suffix,
		disabled,
		readOnly,
		borderless = false,
		wrapperStyle,
		wrapperClassName,
		clearable = true,
		...rest
	} = props;

	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('input');

	const [value, setValue] = useState<string | number>('');
	const mounted = useRef(false);

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

	function handleInput(e: FormEvent<HTMLInputElement>) {
		const el = e.target;

		if (!isHTMLInputElement(el) || disabled) {
			return;
		}

		setValue(el.value);

		if (props.onInput) {
			props.onInput(e);
		}
	}

	useEffect(function () {
		if (mounted.current) {
			if (_value !== value) {
				setValue(_value ?? '');
			}
		} else {
			setValue(_value ?? defaultValue ?? '');
		}

		mounted.current = true;
	}, [_value]);

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
					value={ value }
					readOnly={ readOnly }
					disabled={ disabled }
					onInput={ handleInput }
					prefix={ htmlPrefix }
					ref={ ref }
					className={ classNames(prefixCls, {
						[`${ prefixCls }-icon`]: !!icon,
						[`${ prefixCls }-clearable`]: clearable && !readOnly && !disabled,
						[`${ prefixCls }-borderless`]: borderless,
					}, props.className) }
				/>
				{ (clearable && !readOnly && !disabled) ? (
					<Clear
						className={ prefixCls + '-clear' }
						hidden={ isNullable(value) || value === '' }
						onClick={ function () {
							setValue('');
						} }
					/>
				) : null }
			</div>
			{ addon('suffix', suffix) }
		</div>
	);
});

export { Input };
