import type { FormEvent } from 'react';
import { forwardRef, isValidElement, useEffect, useState } from 'react';
import { classNames, isHTMLInputElement, isNullable } from '../../utils';
import { useRenumProvider } from '../renum-provider';
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
		required,
		borderless = false,
		wrapperStyle,
		wrapperClassName,
		clearable = true,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('input');

	const [value, setValue] = useState<string | number>(defaultValue ?? _value ?? '');

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

	function handleClear() {
		setValue('');
	}

	function renderClear() {
		if (!clearable || required || readOnly || disabled) {
			return null;
		}

		return (
			<Clear
				className={ prefixCls + '-clear' }
				hidden={ isNullable(value) || value === '' }
				onClick={ handleClear }
			/>
		);
	}

	useEffect(function () {
		if (_value !== undefined && _value !== value) {
			setValue(_value ?? '');
		}
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
					required={ required }
					readOnly={ readOnly }
					disabled={ disabled }
					onInput={ handleInput }
					prefix={ htmlPrefix }
					ref={ ref }
					className={ classNames(prefixCls, {
						[`${ prefixCls }-icon`]: !!icon,
						[`${ prefixCls }-clearable`]: clearable && !required && !readOnly && !disabled,
						[`${ prefixCls }-borderless`]: borderless,
					}, props.className) }
				/>
				{ renderClear() }
			</div>
			{ addon('suffix', suffix) }
		</div>
	);
});

export { Input };
