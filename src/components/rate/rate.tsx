import { forwardRef, ReactElement } from 'react';
import type { RateProps } from './interface';
import { useRenumProvider } from '../renum-provider';
import { $, isNullable } from '../../utils';
import { default as StarIcon } from '../../icons/Star';

const Rate = forwardRef<HTMLSpanElement, RateProps>(function Rate(props, ref) {
	const {
		value = 0,
		amount = 5,
		hasHalves,
		icon,
		formatter = String,
		...rest
	} = props;

	const { getPrefixCls, locale } = useRenumProvider();
	const prefixCls = getPrefixCls('rate');

	const Icon = icon ?? StarIcon;

	const placeholder: ReactElement[] = [];
	const stars: ReactElement[] = [];

	for (let i = 0; i < amount; ++i) {
		placeholder.push(<Icon key={ i } />);

		if (i >= value) {
			continue;
		}

		const isHalf = (hasHalves && (value | 0) === i && (value - i) > 0);

		stars.push(
			<Icon
				key={ i }
				className={ $({
					[`${ prefixCls }-star`]: isNullable(icon),
					[`${ prefixCls }-half`]: isHalf,
				}) }
			/>,
		);
	}

	return (
		<span
			{ ...rest }
			className={ $(prefixCls, rest.className) }
			ref={ ref }
		>
			<span className={ getPrefixCls('hidden') }>
				{ formatter(value) + ' ' + ((value === 1) ? locale.rate.star : locale.rate.stars) }
			</span>
			<span className={ `${ prefixCls }-placeholder` } aria-hidden="true">
				{ placeholder }
			</span>
			<span className={ `${ prefixCls }-stars` } aria-hidden="true">
				{ stars }
			</span>
		</span>
	);
});

export { Rate };
