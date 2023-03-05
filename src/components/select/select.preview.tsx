import { Select } from './select';
import { useEffect, useId, useRef, useState } from 'react';
import { Loading } from '../loading';
import { Button } from '../button';

const config = {
	title: 'select',
};

type User = { id: number; firstName: string; };

const URL = 'https://dummyjson.com/users?limit=16&select=firstName';

async function fetchUsers() {
	const response = await fetch(URL);

	if (!response.ok) {
		return [];
	}

	return (await response.json())['users'] as User[];
}

function Simple() {
	const id = useId();
	const [value, setValue] = useState<number>();
	const [users, setUsers] = useState<User[]>([]);
	const fetching = useRef(false);

	const user = users.find((v) => v.id === value);

	function setRandom() {
		setValue((Math.random() * users.length + 1) | 0);
	}

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
			<div>
				selected: { user?.firstName }
				<br />
				<Button onClick={ setRandom }>Select random user</Button>
			</div>
			<label id={ id } style={ { display: 'block', marginBlock: '1em' } }>
				Choose a user
			</label>
			<Select
				value={ value }
				onChange={ (v) => setValue(Number(v)) }
				aria-labelledby={ id }
				placeholder="Placeholder"
				options={ users.map((v) => ({ value: v.id, label: v.firstName })) }
			/>
		</div>
	);
}

export { Simple };
export default config;
