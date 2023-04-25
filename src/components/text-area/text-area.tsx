import type { FormEvent } from 'react';
import { forwardRef } from 'react';
import type { TextAreaProps } from './interface.js';
import { useRenumProvider } from '../renum-provider/index.js';
import { $ } from '../../utils/index.js';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
	const {
		autoResize = false,
		resize = 'block',
		rows = 2,
		...rest
	} = props;

	const { getPrefixCls } = useRenumProvider();
	const prefixCls = getPrefixCls('text-area');

	function handleInput(e: FormEvent<HTMLTextAreaElement>) {
		const target = e.target;

		if (autoResize && target instanceof HTMLTextAreaElement) {
			const nl = target.value.match(/(\n)/gm)?.length ?? 0;

			target.style.setProperty('--rows', String(nl + 1));
		}

		rest?.onInput?.(e);
	}

	return (
		<textarea
			{ ...rest }
			rows={ rows }
			onInput={ handleInput }
			className={ $(prefixCls, rest.className, {
				[`${ prefixCls }-resize`]: (resize === true || resize === 'both'),
				[`${ prefixCls }-resize-block`]: (resize === 'block'),
				[`${ prefixCls }-resize-inline`]: (resize === 'inline'),
			}) }
			style={ {
				// @ts-ignore
				'--rows': rows,
				...rest?.style,
			} }
			ref={ ref }
		/>
	);
});

export { TextArea };
