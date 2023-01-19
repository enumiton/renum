import { Checkbox } from './checkbox';
import { Button } from '../button';
import { useState } from 'react';

const config = {
	title: 'checkbox',
};

function Simple() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '0.5em' } }>
			<Checkbox name="simple" value={ 1 }>
				Option 1
			</Checkbox>
			<Checkbox name="simple" value={ 2 }>
				Option 2
			</Checkbox>
			<Checkbox name="simple" value={ 3 }>
				Option 3
			</Checkbox>
		</div>
	);
}

function Disabled() {
	const [disabled, setDisabled] = useState(false);

	function toggle() {
		setDisabled((state) => !state);
	}

	return (
		<>
			<div style={ { display: 'flex', flexDirection: 'column', gap: '0.5em' } }>
				<Checkbox name="simple" value={ 1 } disabled={ disabled }>
					Option 1
				</Checkbox>
				<Checkbox name="simple" value={ 2 } disabled={ disabled }>
					Option 2
				</Checkbox>
				<Checkbox name="simple" value={ 3 } disabled={ disabled }>
					Option 3
				</Checkbox>
			</div>
			<div style={ { marginTop: '1em' } }>
				<Button onClick={ toggle } aria-live="polite">{ disabled ? 'Disabled' : 'Enabled' }</Button>
			</div>
		</>
	);
}

export { Simple, Disabled };
export default config;
