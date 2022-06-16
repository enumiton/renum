import { forwardRef, useRef, useState } from 'react';
import { classNames } from '../../utils';
import { useConfigProvider } from '../renum-provider';
import type { SelectProps } from './interface';
import { default as Selector } from '../../icons/Selector';
import { Portal } from '../portal';
import { Overlay } from '../overlay';

const Select = forwardRef<HTMLButtonElement, SelectProps>(function (props, ref) {
	const {
		icon,
		placeholder,
		value: $value,
		onChange,
		...rest
	} = props;

	const [expanded, setExpanded] = useState<boolean>(false);
	const [value, setValue] = useState($value);

	const { getPrefixCls } = useConfigProvider();
	const prefixCls = getPrefixCls('select');

	function handleButtonClick() {
		setExpanded((v) => !v);
	}

	function list() {
		return (
			<ul>
				<li>help</li>
			</ul>
		);
	}

	function children() {
		return value ?? placeholder;
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
				onClick={ handleButtonClick }
				aria-haspopup="listbox"
				aria-expanded={ expanded }
				className={ classNames(prefixCls, {

				}) }
			>
				{ icon }
				<span className={ prefixCls + '-text' }>{ children() }</span>
				<Selector />
			</button>
		</Overlay>
	);
});

export { Select };
