// @todo Light theme.
type RenumTheme = 'dark' /* | 'light' */;

interface RenumConfig {
	readonly prefixCls: string;
	readonly theme?: RenumTheme;
}

export type { RenumConfig };
