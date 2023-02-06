import { Listbox } from './listbox';
import type { ListboxOption, ListboxOptionGroup } from './interface';
import { useId } from 'react';

const config = {
	title: 'listbox',
};

function makeOption(group: true): ListboxOption | ListboxOptionGroup
function makeOption(group: false): ListboxOption
function makeOption(group?: boolean): ListboxOption | ListboxOptionGroup {
	const str = (Math.random() + 1).toString(16).substring(7);
	const rnd = Math.random();

	if (group && rnd > 0.8) {
		return {
			label: str,
			options: new Array(2).fill(false).map(makeOption),
		};
	}

	return {
		label: str,
		value: str,
		disabled: rnd > 0.75,
	};
}

const options = new Array(12).fill(true).map(makeOption);

function Example() {
	const id = useId();

	return (
		<div>
			<label id={ id }>Choose an option</label>
			<Listbox
				placeholder="Placeholder"
				options={ options }
				aria-labelledby={ id }
			/>
		</div>
	);
}

export { Example };
export default config;
