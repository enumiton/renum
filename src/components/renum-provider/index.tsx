import { PropsWithChildren, useCallback, useMemo } from 'react';
import { ConfigConsumer as RenumConsumer, ConfigContext, defaultConfig, defaultPrefixCls, useConfigProvider } from './context';
import type { RenumConfig } from './interface';

let prefixCls = defaultPrefixCls;

function RenumProvider({ children, ...rest }: PropsWithChildren<Partial<Omit<RenumConfig, 'getPrefixCls'>>>) {
	const getPrefixCls = useCallback(function (suffix?: string) {
		return suffix ? prefixCls + '-' + suffix : prefixCls;
	}, [prefixCls]);

	const config = useMemo(function () {
		prefixCls = rest.prefixCls || defaultPrefixCls;

		return {
			...defaultConfig,
			...rest,
			getPrefixCls,
		};
	}, [JSON.stringify(rest)]);

	return (
		<ConfigContext.Provider value={ config }>
			{ children }
		</ConfigContext.Provider>
	);
}

export { RenumProvider, RenumConsumer, useConfigProvider };
export type { RenumConfig };
