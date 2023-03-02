import type { SelectOptions, SelectValue } from './interface.js';

function findOptionByValue<T = SelectValue>(options: SelectOptions<T>, value: T) {
	return options.find(function (option) {
		return (option.value === value);
	});
}

export { findOptionByValue };
