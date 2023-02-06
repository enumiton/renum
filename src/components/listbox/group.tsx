import { forwardRef, useId } from 'react';
import type { GroupProps } from './interface';
import { Option } from './option';
import { useRenumProvider } from '../renum-provider';
import { classNames } from '../../utils';

const OptionGroup = forwardRef<HTMLUListElement, GroupProps>(function ListboxOptionGroup(props, ref) {
	const {
		label,
		options,
		onChange,
		selected,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('listbox');

	const id = rest.id || useId();
	const labelId = id + '-label';

	return (
		<li role="presentation">
			<ul
				{ ...rest }
				id={ id }
				role="group"
				aria-labelledby={ labelId }
				className={ classNames(`${ prefixCls }-group`, rest.className) }
				ref={ ref }
			>
				<span
					id={ labelId }
					role="presentation"
					className={ `${ prefixCls }-group-label` }
				>
					{ label }
				</span>
				{ options.map(function (option, i) {
					return (
						<Option
							{ ...option }
							isSelected={ (selected === option.value) }
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
