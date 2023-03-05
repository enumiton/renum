import { Switch } from './switch';
import { useId, useState } from 'react';
import { Button } from '../button';

const config = {
	title: 'switch',
};

function Simple() {
	const id = useId();

	return (
		<div>
			<label id={ id }>Kitchen lights</label>
			<br />
			<Switch aria-labelledby={ id } />
		</div>
	);
}

function Disabled() {
	const [v, set] = useState(false);

	return (
		<div>
			<Button onClick={ () => set((x) => !x) }>Toggle</Button>
			<br />
			<br />
			<Switch value={ v } disabled />
		</div>
	);
}

export { Simple, Disabled };
export default config;
