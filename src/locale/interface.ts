interface Locale {
	readonly locale: string;
	readonly close: string;
	readonly calendar: {
		readonly prev_year: string;
		readonly prev_month: string;
		readonly next_year: string;
		readonly next_month: string;
	};
	readonly dialog: {
		readonly primaryButtonText: string;
		readonly cancelButtonText: string;
	};
	readonly rate: {
		readonly star: string;
		readonly stars: string;
	};
}

export type { Locale };
