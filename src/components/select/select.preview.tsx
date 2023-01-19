import { default as UserIcon } from '../../icons/User';
import type { SelectOptions } from './interface';
import { Select } from './select';

const config = {
	title: 'select',
};

const ICON = <UserIcon />;

const options: SelectOptions = Array(12).fill(null).map(function () {
	const str = (Math.random() + 1).toString(16).substring(7);

	return {
		label: str,
		value: str,
		icon: Math.random() > 0.5 ? ICON : undefined,
		disabled: Math.random() > 0.75,
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
