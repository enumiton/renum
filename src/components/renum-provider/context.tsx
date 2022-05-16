import { createContext, useContext } from 'react';
import type { RenumConfig } from './interface';

const ConfigContext = createContext<RenumConfig>({
	prefixCls: 're',
});

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

function useConfigProvider() {
	return useContext(ConfigContext);
}

export { ConfigContext, useConfigProvider, ConfigConsumer, ConfigProvider };
