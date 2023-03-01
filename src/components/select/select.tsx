import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { default as Selector } from '../../icons/Selector';
import { classNames, contains, duplicateRef, Key } from '../../utils';
import { Overlay } from '../overlay';
import { useRenumProvider } from '../renum-provider';
import type { SelectOption, SelectProps } from './interface';
import { Clear } from '../clear';
import type { ListboxValue } from '../listbox';
import { Listbox } from '../listbox';
import { useKeyDownListener } from '../../hooks';

const SELECTOR_ICON = <Selector />;

const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
	const {
		name,
		placeholder,
		value: $value,
		options,
		onChange,
		clearable = true,
		placement,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('select');

	const [expanded, setExpanded] = useState<boolean>(false);
	const [selected, setSelected] = useState<SelectOption | undefined>();

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const listboxRef = useRef<HTMLUListElement | null>(null);

	const id = props.id || useId();
	const buttonId = id + '-button';
	const listboxId = id + '-list';

	function close() {
		const btn = buttonRef.current;

		if (btn) {
			btn.focus();
		}

		setExpanded(false);
	}

	function open() {
		if (!expanded) {
			setExpanded(true);
		}
	}

	function clear() {
		if (clearable) {
			setSelected(undefined);
		}
	}

	function handleListboxChange(value: ListboxValue) {
		setSelected(options.find(function (v) {
			return (v.value === value);
		}));

		close();
	}

	function handleOutsideClick(e: Event) {
		if (!contains(e.target, [buttonRef.current, listboxRef.current])) {
			close();
		}
	}

	function handleButtonClick() {
		if (expanded) {
			close();
		} else {
			open();
		}
	}

	useKeyDownListener(buttonRef, {
		[Key.Up]: open,
		[Key.Down]: open,
		[Key.Space]: open,
		[Key.Enter]: open,
		[Key.Escape]: close,
		[Key.Clear]: clear,
		[Key.Delete]: clear,
		[Key.Backspace]: clear,
	}, { preventDefault: true, stopPropagation: true });

	useEffect(function () {
		if (expanded) {
			listboxRef.current?.focus();
			window.addEventListener('click', handleOutsideClick, { passive: true });
		}

		return function () {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, [expanded]);

	return (
		<Overlay
			portalClassName={ `${ prefixCls }-portal` }
			className={ `${ prefixCls }-wrapper` }
			content={ (
				<Listbox
					ref={ listboxRef }
					id={ listboxId }
					value={ selected?.value }
					options={ options }
					onChange={ handleListboxChange }
					className={ `${ prefixCls }-listbox` }
				/>
			) }
			hidden={ !expanded }
			align={ placement }
		>
			<input
				type="hidden"
				name={ name }
				value={ selected?.value ?? '' }
				hidden
			/>
			<button
				{ ...rest }
				id={ buttonId }
				type="button"
				role="button"
				aria-haspopup="listbox"
				aria-expanded={ expanded }
				onClick={ handleButtonClick }
				className={ classNames(prefixCls, rest.className) }
				ref={ duplicateRef(buttonRef, ref) }
			>
				{ selected?.icon }
				<span
					aria-label={ selected?.ariaLabel }
					className={ classNames(`${ prefixCls }-text`, {
						[`${ prefixCls }-placeholder`]: (!selected),
					}) }
				>
					{ selected?.label ?? placeholder }
				</span>
				{ SELECTOR_ICON }
			</button>
			{ clearable ? (
				<Clear
					className={ `${ prefixCls }-clear` }
					hidden={ (selected === undefined) }
					onClick={ clear }
				/>
			) : null }
		</Overlay>
	);
});

export { Select };

