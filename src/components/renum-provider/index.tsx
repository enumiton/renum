import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { RenumContext, useRenumProvider } from './context';
import type { RenumConfig, RenumProviderProps } from './interface';

const PREFIX_CLS = 're';

function getPrefixCls(suffix?: string): string {
	return suffix ? PREFIX_CLS + '-' + suffix : PREFIX_CLS;
}

function RenumProvider({ children, locale }: PropsWithChildren<RenumProviderProps>) {
	let value: RenumConfig = useMemo(function () {
		return {
			getPrefixCls,
			locale,
		};
	}, [locale.locale]);

	return (
		<RenumContext.Provider value={ value }>
			{ children }
		</RenumContext.Provider>
	);
}

export { RenumProvider, useRenumProvider };
export type { RenumConfig };
