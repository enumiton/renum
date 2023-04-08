import type { ReactElement, TableHTMLAttributes } from 'react';
import type { DayOfWeek } from './date';

interface BaseCalendarProps extends Omit<TableHTMLAttributes<HTMLTableElement>, 'value' | 'defaultValue' | 'role' | 'onChange'> {
	readonly 'aria-labelledby': string;
	readonly value?: Date | undefined;
	readonly defaultValue?: Date | undefined;
	readonly date?: Date | undefined;
	readonly min?: Date | undefined;
	readonly max?: Date | undefined;
	readonly readonly?: boolean | undefined;
	readonly disabled?: boolean | undefined;
	readonly onChange?: ((value: Date) => void) | undefined;
	readonly onDateChange?: ((date: Date) => void) | undefined;
	/** @default DayOfWeek.Sunday */
	readonly firstDayOfWeek?: DayOfWeek | undefined;
	readonly renderCell?: ((date: Date, index: number) => ReactElement) | undefined;
	/** @default false */
	readonly showOutOfBoundsDate?: boolean | undefined;
}

interface CalendarProps extends Omit<BaseCalendarProps, 'aria-labelledby'> {
	readonly 'aria-labelledby'?: string | undefined;
	readonly tableClassName?: string | undefined;
}

export type { BaseCalendarProps, CalendarProps };
