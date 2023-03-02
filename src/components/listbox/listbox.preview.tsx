import { Listbox } from './listbox';
import type { ListboxOption, ListboxOptionGroup } from './interface';
import { useEffect, useId, useRef, useState } from 'react';
import { Loading } from '../loading/index.js';

const config = {
	title: 'listbox',
};

type User = { id: number; firstName: string; };

const URL = 'https://dummyjson.com/users?limit=12&select=firstName';

async function fetchUsers() {
	const response = await fetch(URL);

	if (!response.ok) {
		return [];
	}

	return (await response.json())['users'] as User[];
}

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
	const [users, setUsers] = useState<User[]>([]);
	const fetching = useRef(false);

	useEffect(function () {
		if (!fetching.current) {
			fetching.current = true;
			fetchUsers().then(setUsers);
		}
	}, []);

	if (users.length <= 0) {
		return <Loading active />;
	}

	return (
		<div>
			<label id={ id }>Choose an option</label>
			<Listbox
				options={ users.map((v) => ({ value: v.id, label: v.firstName })) }
				aria-labelledby={ id }
				style={ { marginBlockStart: '1em' } }
			/>
		</div>
	);
}

export { Example };
export default config;
