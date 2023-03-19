import { createContext, useContext } from 'react';
import DEFAULT_TRANSLATIONS from '../../locale/en-us';
import type { RenumConfig } from './interface';

const defaultConfig: RenumConfig = {
	locale: DEFAULT_TRANSLATIONS,
	getPrefixCls: function () {
		throw Error('[Renum/Provider]: missing context');
	},
};

const RenumContext = createContext<RenumConfig>(defaultConfig);

function useRenumProvider() {
	return useContext(RenumContext);
}

export { useRenumProvider, RenumContext };
