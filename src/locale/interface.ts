interface Locale {
	readonly locale: string;
	readonly close: string;
	readonly dialog: {
		readonly primaryButtonText: string;
		readonly cancelButtonText: string;
	};
}

export type { Locale };
