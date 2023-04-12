import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { BaseCalendarProps } from './interface';
import {
	addDays,
	addMonths,
	addWeeks,
	DayOfWeek,
	DAYS_IN_WEEK,
	endOfWeek,
	makeFormatters,
	startOfDay,
	startOfMonth,
	startOfWeek,
	toDateISOString,
} from './date';
import { useRenumProvider } from '../renum-provider';
import { $, elementIsDisabled, getKey, isHTMLElement, Key } from '../../utils';
import { useKeyDownListener } from '../../hooks';
import { flushSync } from 'react-dom';
import { getDateElementByDate, getFocusableDate, resetTabindex } from './helpers';

const BaseCalendar = forwardRef<HTMLTableElement, BaseCalendarProps>(function BaseCalendar(props, ref) {
	const {
		date: _date = startOfDay(new Date()),
		value: _value,
		defaultValue,
		min,
		max,
		readonly,
		disabled,
		onChange,
		onDateChange,
		firstDayOfWeek = DayOfWeek.Sunday,
		renderCell,
		cellClassName,
		cellDisabled,
		showOutOfBoundsDate = false,
		...rest
	} = props;

	const { getPrefixCls, locale } = useRenumProvider();
	const prefixCls = getPrefixCls('calendar');

	const [date, setDate] = useState(_date);
	const [value, $setValue] = useState(defaultValue);

	const formatters = useRef(makeFormatters(locale.locale));
	const bodyRef = useRef<HTMLTableSectionElement>(null);

	const nowDateISO = toDateISOString(new Date());
	const valueDateISO = value ? toDateISOString(value) : undefined;

	const monthStart = startOfWeek(startOfMonth(date), firstDayOfWeek);

	let dates: Date[][] = [];

	for (let i = 0; i < 6; i++) {
		const start = addWeeks(monthStart, i);

		dates[i] ??= [];

		for (let j = 0; j < DAYS_IN_WEEK; j++) {
			dates[i]![j] = addDays(start, j);
		}
	}

	function setValue(next: Date) {
		$setValue(next);
		onChange?.(next);
	}

	function handleClick(day: Date) {
		return function (e: ReactMouseEvent<HTMLTableDataCellElement>) {
			if (readonly || disabled || elementIsDisabled(e.currentTarget)) {
				return;
			}

			setValue(day);
		};
	}

	function handleKeyDown(day: Date) {
		return function (e: ReactKeyboardEvent<HTMLTableDataCellElement>) {
			if (readonly || disabled || elementIsDisabled(e.currentTarget)) {
				return;
			}

			const key = getKey(e.key);

			if (key !== Key.Space && key !== Key.Enter) {
				return;
			}

			e.stopPropagation();
			e.preventDefault();

			setValue(day);
		};
	}

	function focusDate(next: Date) {
		const tbody = bodyRef.current;

		if (!isHTMLElement(tbody)) {
			return;
		}

		const prev = getFocusableDate(tbody, date);

		if (next.getFullYear() !== prev.getFullYear() || next.getMonth() !== prev.getMonth()) {
			flushSync(function () {
				setDate(next);
				onDateChange?.(next);
			});
		}

		resetTabindex(tbody);

		const col = getDateElementByDate(tbody, next);

		col?.setAttribute('tabindex', '0');
		col?.focus();
	}

	function moveDay(amount: number) {
		return function (_: KeyboardEvent, tbody: HTMLTableSectionElement) {
			const prev = getFocusableDate(tbody, date);

			focusDate(addDays(prev, amount));
		};
	}

	function moveStartOrEndWeek(position: 'start' | 'end') {
		return function (_: KeyboardEvent, tbody: HTMLTableSectionElement) {
			let prev = getFocusableDate(tbody, date);

			prev = (position === 'start')
				? startOfWeek(prev, firstDayOfWeek)
				: endOfWeek(prev, firstDayOfWeek);

			focusDate(prev);
		};
	}

	function moveMonthOrYear(amount: number) {
		return function (e: KeyboardEvent, tbody: HTMLTableSectionElement) {
			const prev = getFocusableDate(tbody, date);

			focusDate(addMonths(prev, (e.shiftKey) ? (amount * 12) : amount));
		};
	}

	useKeyDownListener(bodyRef, {
		[Key.Up]: moveDay(-DAYS_IN_WEEK),
		[Key.Down]: moveDay(+DAYS_IN_WEEK),
		[Key.Right]: moveDay(+1),
		[Key.Left]: moveDay(-1),
		[Key.Home]: moveStartOrEndWeek('start'),
		[Key.End]: moveStartOrEndWeek('end'),
		[Key.PageUp]: moveMonthOrYear(-1),
		[Key.PageDown]: moveMonthOrYear(+1),
	}, { preventDefault: true, stopPropagation: true });

	useEffect(function () {
		if (_value !== undefined && toDateISOString(_value) !== valueDateISO) {
			$setValue(_value);
		}
	}, [_value?.getTime()]);

	useEffect(function () {
		if (_date.getTime() !== date.getTime()) {
			setDate(_date);
		}
	}, [_date?.getTime()]);

	useEffect(function () {
		formatters.current = makeFormatters(locale.locale);
	}, [locale.locale]);

	return (
		<table
			{ ...rest }
			role="grid"
			className={ $(prefixCls, rest.className) }
			ref={ ref }
		>
			<thead>
				<tr>
					{ dates[0]!.map(function (day, i) {
						return (
							<th key={ i } scope="col" abbr={ formatters.current.weekdayLong(day) }>
								{ formatters.current.weekdayShort(day) }
							</th>
						);
					}) }
				</tr>
			</thead>
			<tbody ref={ bodyRef }>
				{ dates.map(function (week, i) {
					if (i === (dates.length - 1) && week[0]?.getMonth() !== date.getMonth()) {
						return null;
					}

					return (
						<tr key={ i }>
							{ week.map(function (day, j) {
								const dayDateISO = toDateISOString(day);
								const isOutOfBounds = (day.getMonth() !== date.getMonth());

								if (!showOutOfBoundsDate && isOutOfBounds) {
									return <td key={ j } aria-hidden="true" />;
								}

								return (
									<td
										key={ j }
										onClick={ handleClick(day) }
										onKeyDown={ handleKeyDown(day) }
										data-date={ dayDateISO }
										aria-selected={ (dayDateISO === valueDateISO) }
										aria-current={ (dayDateISO === nowDateISO) ? 'date' : undefined }
										aria-readonly={ readonly }
										aria-disabled={ (disabled || cellDisabled?.(day)) }
										tabIndex={ (day.getFullYear() === date.getFullYear() && day.getDate() === date.getDate()) ? 0 : -1 }
										className={ (typeof cellClassName === 'function') ? cellClassName(day) : cellClassName }
									>
										{ renderCell ? renderCell(day) : (
											<time dateTime={ dayDateISO }>
												{ day.getDate() }
											</time>
										) }
									</td>
								);
							}) }
						</tr>
					);
				}) }
			</tbody>
		</table>
	);
});

export { BaseCalendar };
