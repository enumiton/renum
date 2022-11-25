import type { Locale } from '../../locale/interface';

interface RenumConfig {
	readonly getPrefixCls: (suffix?: string) => string;
	readonly locale: Locale;
}

interface RenumProviderProps {
	readonly locale: Locale;
}

export type { RenumConfig, RenumProviderProps };
