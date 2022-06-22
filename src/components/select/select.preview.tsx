import { default as UserIcon } from '../../icons/User';
import type { SelectOptions } from './interface';
import { Select } from './select';

const ICON = <UserIcon />;

const config = {
	title: 'select',
};

const options: SelectOptions = Array(25).fill(null).map(function () {
	const str = (Math.random() + 1).toString(36).substring(7);

	return {
		label: str,
		value: str,
		icon: Math.random() > 0.5 ? ICON : undefined,
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
