// @todo Light theme.
type RenumTheme = 'dark' | 'light';

interface RenumConfig {
	readonly prefixCls: string;
	readonly getPrefixCls: (suffix?: string) => string;
	readonly theme?: RenumTheme;
}

export type { RenumConfig };
