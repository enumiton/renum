import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { BaseCalendarProps } from './interface';
import {
	addDays,
	addWeeks,
	DayOfWeek,
	DAYS_IN_WEEK,
	makeFormatters,
	startOfDay,
	startOfMonth,
	startOfWeek,
	toDateISOString,
} from './date';
import { useRenumProvider } from '../renum-provider';
import { $, elementIsDisabled, getKey, Key } from '../../utils';
import { useKeyDownListener } from '../../hooks';
import { flushSync } from 'react-dom';

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

	const monthStart = startOfWeek(addDays(startOfMonth(date), -firstDayOfWeek));

	let dates: Date[][] = [];

	for (let i = 0; i < 6; i++) {
		const start = addWeeks(monthStart, i);

		dates[i] ??= [];

		for (let j = 0; j < DAYS_IN_WEEK; j++) {
			dates[i]![j] = addDays(start, (j + firstDayOfWeek));
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
			const key = getKey(e.key);

			if (readonly || disabled || key !== Key.Space || elementIsDisabled(e.currentTarget)) {
				return;
			}

			e.stopPropagation();
			e.preventDefault();

			setValue(day);
		};
	}

	function moveFocus(amount: number) {
		return function (_: KeyboardEvent, el: HTMLTableSectionElement) {
			const focused = el.querySelector<HTMLTableDataCellElement>(`[tabindex="0"]`);
			const prev = new Date(focused?.dataset.date ?? date);

			const next = addDays(prev, amount);

			if (next.getMonth() !== prev.getMonth()) {
				flushSync(function () {
					setDate(next);
					onDateChange?.(next);
				});
			}

			const col = el.querySelector<HTMLTableDataCellElement>(`[data-date="${ toDateISOString(next) }"]`);

			focused?.setAttribute('tabindex', '-1');

			col?.setAttribute('tabindex', '0');
			col?.focus();
		};
	}

	useKeyDownListener(bodyRef, {
		[Key.Up]: moveFocus(-DAYS_IN_WEEK),
		[Key.Down]: moveFocus(+DAYS_IN_WEEK),
		[Key.Right]: moveFocus(+1),
		[Key.Left]: moveFocus(-1),
	}, { stopPropagation: true });

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
										aria-disabled={ isOutOfBounds }
										tabIndex={ (day.getDate() === date.getDate()) ? 0 : -1 }
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
