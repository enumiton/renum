import { forwardRef, useId } from 'react';
import type { GroupProps } from './interface';
import { Option } from './option';
import { useRenumProvider } from '../renum-provider';
import { $ } from '../../utils';

const OptionGroup = forwardRef<HTMLUListElement, GroupProps>(function ListboxOptionGroup(props, ref) {
	const {
		label,
		options,
		onChange,
		selected,
		disabled,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('listbox-group');

	const id = rest.id || useId();
	const labelId = id + '-label';

	return (
		<li role="presentation">
			<ul
				{ ...rest }
				id={ id }
				role="group"
				aria-labelledby={ labelId }
				className={ $(prefixCls, {
					[`${ prefixCls }-disabled`]: disabled,
				}, rest.className) }
				ref={ ref }
			>
				<li
					id={ labelId }
					role="presentation"
					className={ `${ prefixCls }-label` }
				>
					{ label }
				</li>
				{ options.map(function (option, i) {
					return (
						<Option
							{ ...option }
							id={ `${ id }-option-${ i }` }
							isSelected={ (selected === option.value) }
							disabled={ disabled }
							onChange={ onChange }
							key={ i }
						/>
					);
				}) }
			</ul>
		</li>
	);
});

export { OptionGroup };
