import { forwardRef, useId, useState } from 'react';
import { classNames, FALSE } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { SelectOption, SelectProps } from './interface';
import { default as Selector } from '../../icons/Selector';
import { Overlay } from '../overlay';

const SELECTOR_ICON = <Selector />;

const Select = forwardRef<HTMLButtonElement, SelectProps>(function (props, ref) {
	const {
		icon,
		placeholder,
		value: $value,
		options,
		onChange,
		...rest
	} = props;

	const id = props.id || useId();
	const buttonId = id + '-button';
	const labelId = id + '-label';
	const listId = id + '-list';

	const [expanded, setExpanded] = useState<boolean>(false);
	const [selected, setSelected] = useState<number | undefined>();

	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('select');

	function handleButtonClick() {
		setExpanded((v) => !v);
	}

	function Option(option: SelectOption, index: number) {
		return (
			<li
				key={ index }
				id={ id + '-option-' + index }
				role="option"
				aria-label={ option?.aria }
				tabIndex={ -1 }
				className={ prefixCls + '-option' }
				data-value={ option.value }
			>
				{ option?.icon }
				<span>{ option.label }</span>
			</li>
		);
	}

	function list() {
		return (
			<ul
				id={ listId }
				role="listbox"
				aria-labelledby={ labelId }
				aria-multiselectable={ FALSE }
				className={ prefixCls + '-list' }
			>
				{ options.map(Option) }
			</ul>
		);
	}

	function children() {
		let label: string | number | undefined = placeholder;

		if (selected !== undefined) {
			label = options?.[selected]?.label;
		}

		return (
			<span className={ classNames(prefixCls + '-text', {
				[`${ prefixCls }-placeholder`]: selected === undefined,
			}) }>
				{ label }
			</span>
		);
	}

	return (
		<Overlay
			className={ prefixCls + '-wrapper' }
			content={ list() }
			hidden={ !expanded }
		>
			<button
				{ ...rest }
				ref={ ref }
				id={ buttonId }
				role="button"
				type="button"
				onClick={ handleButtonClick }
				aria-haspopup="listbox"
				aria-expanded={ expanded }
				className={ classNames(prefixCls, rest.className) }
			>
				{ icon }
				{ children() }
				{ SELECTOR_ICON }
			</button>
		</Overlay>
	);
});

export { Select };
