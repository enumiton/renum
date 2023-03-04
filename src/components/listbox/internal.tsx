import { forwardRef, useId } from 'react';
import type { InternalListboxProps } from './interface';
import { Option } from './option';
import { OptionGroup } from './group';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

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

	return (
		<ul
			aria-orientation="vertical"
			aria-multiselectable={ multiSelectable }
			tabIndex={ 0 }
			{ ...rest }
			role="listbox"
			className={ $(prefixCls, rest.className) }
			ref={ ref }
		>
			{ options.map(function (option, i) {
				return ('options' in option) ? (
					<OptionGroup
						{ ...option }
						id={ `${ id }-group-${ i }` }
						selected={ selected }
						onChange={ onChange }
						key={ i }
					/>
				) : (
					<Option
						{ ...option }
						id={ `${ id }-option-${ i }` }
						isSelected={ (selected === option.value) }
						onChange={ onChange }
						key={ i }
					/>
				);
			}) }
		</ul>
	);
});

export { InternalListbox };
