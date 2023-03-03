import { Listbox } from './listbox';
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
