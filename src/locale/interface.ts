interface Locale {
	readonly locale: string;
	readonly close: string;
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
