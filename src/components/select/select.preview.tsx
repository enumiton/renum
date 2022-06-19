import type { SelectOptions } from './interface';
import { Select } from './select';

const config = {
	title: 'select',
};

const options: SelectOptions = Array(25).fill(null).map(function () {
	const str = (Math.random() + 1).toString(36).substring(7);

	return {
		label: str,
		value: str,
	};
});

function Simple() {
	return (
		<Select
			placeholder="Placeholder"
			options={ options }
		/>
	);
}

export { Simple };
export default config;
