import type { UIEvent } from 'react';
import { forwardRef, useId } from 'react';
import type { InternalListboxProps, ListboxValue } from './interface';
import { Option } from './option';
import { OptionGroup } from './group';
import { useRenumProvider } from '../renum-provider';
import { classNames } from '../../utils';

/** @internal */
const InternalListbox = forwardRef<HTMLUListElement, InternalListboxProps>(function InternalListbox(props, ref) {
	const {
		value: selected,
		options,
		onChange,
		disabled,
		multiSelectable,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('listbox');
	const id = props.id || useId();

	function handleChange(value: ListboxValue, e: UIEvent<HTMLElement>) {
		onChange?.(value, e);
	}

	return (
		<ul
			aria-orientation="vertical"
			aria-multiselectable={ multiSelectable }
			tabIndex={ 0 }
			{ ...rest }
			role="listbox"
			className={ classNames(prefixCls, rest.className) }
			ref={ ref }
		>
			{ options.map(function (option, i) {
				return ('options' in option) ? (
					<OptionGroup
						{ ...option }
						id={ `${ id }-group-${ i }` }
						selected={ selected }
						onChange={ handleChange }
						key={ i }
					/>
				) : (
					<Option
						{ ...option }
						id={ `${ id }-option-${ i }` }
						isSelected={ (selected === option.value) }
						onChange={ handleChange }
						key={ i }
					/>
				);
			}) }
		</ul>
	);
});

export { InternalListbox };
