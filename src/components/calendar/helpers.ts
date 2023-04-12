import { toDateISOString } from './date';

function getFocusableDateElement(tbody: HTMLTableSectionElement) {
	return tbody.querySelector<HTMLTableDataCellElement>('td[tabindex="0"]');
}

function getFocusableDate(tbody: HTMLTableSectionElement, fallback: Date) {
	return new Date(tbody.querySelector<HTMLTableDataCellElement>('td[tabindex="0"]')?.dataset?.date ?? fallback);
}

function getDateElementByDate(tbody: HTMLTableSectionElement, date: Date) {
	return tbody.querySelector<HTMLTableDataCellElement>(`td[data-date="${ toDateISOString(date) }"]`);
}

function resetTabindex(tbody: HTMLTableSectionElement) {
	const tds = Array.from(tbody.querySelectorAll<HTMLTableDataCellElement>('td'));

	for (const td of tds) {
		td.setAttribute('tabindex', '-1');
	}
}

export { getFocusableDateElement, getFocusableDate, getDateElementByDate, resetTabindex };
