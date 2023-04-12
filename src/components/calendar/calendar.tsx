import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { CalendarProps } from './interface';
import { BaseCalendar } from './base';
import { useRenumProvider } from '../renum-provider';
import { makeFormatters } from './date';
import { Button } from '../button';
import { $ } from '../../utils';
import { default as ChevronLeftIcon } from '../../icons/ChevronLeft';
import { default as DoubleChevronLeftIcon } from '../../icons/ChevronsLeft';
import { default as ChevronRightIcon } from '../../icons/ChevronRight';
import { default as DoubleChevronRightIcon } from '../../icons/ChevronsRight';

const CHEVRON_LEFT_ICON = <ChevronLeftIcon />;
const DOUBLE_CHEVRON_LEFT_ICON = <DoubleChevronLeftIcon />;
const CHEVRON_RIGHT_ICON = <ChevronRightIcon />;
const DOUBLE_CHEVRON_RIGHT_ICON = <DoubleChevronRightIcon />;

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(props, ref) {
	const {
		value,
		date: _date,
		tableClassName,
		className,
		style,
		onChange,
		onDateChange,
		...rest
	} = props;

	const { getPrefixCls, locale } = useRenumProvider();
	const prefixCls = getPrefixCls('calendar');

	const id = useId();

	const [date, setDate] = useState(_date ?? new Date());
	const formatters = useRef(makeFormatters(locale.locale));

	function changeDate(amount: number) {
		return function () {
			const next = new Date(date);

			next.setMonth(date.getMonth() + amount);

			setDate(next);
			onDateChange?.(next);
		};
	}

	function handleDateChange(v: Date) {
		setDate(v);
		onDateChange?.(v);
	}

	useEffect(function () {
		formatters.current = makeFormatters(locale.locale);
	}, [locale.locale]);

	useEffect(function () {
		if (_date !== undefined && _date.getTime() !== date.getTime()) {
			setDate(_date);
		}
	}, [_date?.getTime()]);

	return (
		<div className={ $(`${ prefixCls }-wrapper`, className) } style={ style } ref={ ref }>
			<div className={ `${ prefixCls }-header` }>
				<div className={ `${ prefixCls }-header-start` }>
					<Button
						type="text"
						onClick={ changeDate(-12) }
						aria-label={ locale.calendar.prev_year }
						icon={ DOUBLE_CHEVRON_LEFT_ICON }
					/>
					<Button
						type="text"
						onClick={ changeDate(-1) }
						aria-label={ locale.calendar.prev_month }
						icon={ CHEVRON_LEFT_ICON }
					/>
				</div>
				<time
					id={ id }
					className={ `${ prefixCls }-header-title` }
					dateTime={ `${ date.getFullYear() }-${ date.getMonth() + 1 }` }
					aria-live="polite"
				>
					{ formatters.current.title(date) }
				</time>
				<div className={ `${ prefixCls }-header-end` }>
					<Button
						type="text"
						onClick={ changeDate(+1) }
						aria-label={ locale.calendar.next_month }
						icon={ CHEVRON_RIGHT_ICON }
					/>
					<Button
						type="text"
						onClick={ changeDate(+12) }
						aria-label={ locale.calendar.next_year }
						icon={ DOUBLE_CHEVRON_RIGHT_ICON }
					/>
				</div>
			</div>
			<BaseCalendar
				{ ...rest }
				date={ date }
				value={ value }
				className={ tableClassName }
				aria-labelledby={ id }
				onChange={ onChange }
				onDateChange={ handleDateChange }
			/>
		</div>
	);
});

export { Calendar };
