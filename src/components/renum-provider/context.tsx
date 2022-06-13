import { createContext, useContext } from 'react';
import type { RenumConfig } from './interface';

const defaultPrefixCls = 're';
const defaultConfig = {
	prefixCls: defaultPrefixCls,
	getPrefixCls: function () {
		throw Error('No context found');
	},
};

const ConfigContext = createContext<RenumConfig>(defaultConfig);

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

function useConfigProvider() {
	return useContext(ConfigContext);
}

export { ConfigContext, useConfigProvider, ConfigConsumer, ConfigProvider, defaultPrefixCls, defaultConfig };
