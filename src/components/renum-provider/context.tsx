import { createContext, useContext } from 'react';
import locale from '../../locale/en-us';
import type { RenumConfig } from './interface';

const defaultConfig: RenumConfig = {
	locale,
	getPrefixCls: function () {
		throw Error('No context found');
	},
};

const RenumContext = createContext<RenumConfig>(defaultConfig);

function useRenumProvider() {
	return useContext(RenumContext);
}

export { useRenumProvider, RenumContext };
