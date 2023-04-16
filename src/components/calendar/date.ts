enum DayOfWeek {
	Sunday = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
}

const DAYS_IN_WEEK = 7;

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;
const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;

function startOfDay(date: Date) {
	const dupe = new Date(date);
	dupe.setHours(0, 0, 0, 0);

	return dupe;
}

function endOfDay(date: Date) {
	const dupe = new Date(date);
	dupe.setHours(23, 59, 59, 999);

	return dupe;
}

function startOfWeek(date: Date, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday) {
	const day = date.getDay();

	return startOfDay(addDays(date, -((day < firstDayOfWeek ? DAYS_IN_WEEK : 0) + (day - firstDayOfWeek))));
}

function endOfWeek(date: Date, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday) {
	const dupe = new Date(date);
	dupe.setDate(date.getDate() - (date.getDay() - firstDayOfWeek) + DAYS_IN_WEEK);

	return endOfDay(dupe);
}

function startOfMonth(date: Date) {
	const dupe = new Date(date);
	dupe.setDate(1);

	return startOfDay(dupe);
}

function endOfMonth(date: Date) {
	const dupe = new Date(date);
	dupe.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);

	return endOfDay(dupe);
}

function addDays(date: Date, amount: number) {
	const dupe = new Date(date);
	dupe.setDate(date.getDate() + amount);

	return dupe;
}

function addWeeks(date: Date, amount: number) {
	const dupe = new Date(date);
	dupe.setDate(date.getDate() + (amount * DAYS_IN_WEEK));

	return dupe;
}

function addMonths(date: Date, amount: number) {
	const dupe = new Date(date);
	dupe.setMonth(date.getMonth() + amount);

	return dupe;
}

function daysInMonth(date: Date) {
	return endOfMonth(date).getDate();
}

function weeksInMonth(date: Date, firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday) {
	const lower = startOfWeek(startOfMonth(new Date(date)), firstDayOfWeek);
	const upper = startOfWeek(endOfMonth(new Date(date)), firstDayOfWeek);

	return (upper.getTime() - lower.getTime()) / MILLISECONDS_IN_WEEK + 1 | 0;
}

function toDateISOString(date: Date) {
	return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
}

function makeFormatters(locale: string) {
	const title = Intl.DateTimeFormat(locale, {
		month: 'short',
		year: 'numeric',
	}).format;

	const weekdayShort = Intl.DateTimeFormat(locale, {
		weekday: 'short',
	}).format;

	const weekdayLong = Intl.DateTimeFormat(locale, {
		weekday: 'long',
	}).format;

	return {
		title,
		weekdayShort,
		weekdayLong,
	};
}

export {
	DayOfWeek,
	DAYS_IN_WEEK,
	startOfDay,
	endOfDay,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	addDays,
	addWeeks,
	addMonths,
	daysInMonth,
	weeksInMonth,
	toDateISOString,
	makeFormatters,
};
