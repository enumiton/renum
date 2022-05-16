import type { PropsWithChildren } from 'react';
import { ConfigConsumer as RenumConsumer, ConfigContext, useConfigProvider } from './context';
import type { RenumConfig } from './interface';

function RenumProvider({ children, ...config }: PropsWithChildren<RenumConfig>) {
	return (
		<ConfigContext.Provider value={ config }>
			{ children }
		</ConfigContext.Provider>
	);
}

export { RenumProvider, RenumConsumer, useConfigProvider };
export type { RenumConfig };
