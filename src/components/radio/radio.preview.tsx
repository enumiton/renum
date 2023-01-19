import { Radio } from './radio';
import { useState } from 'react';
import { Button } from '../button';

const config = {
	title: 'radio',
};

function Example() {
	return (
		<>
			<Radio name="example" value={ 1 }>
				Option 1
			</Radio>
			<Radio name="example" value={ 2 }>
				Option 2
			</Radio>
			<Radio name="example" value={ 3 }>
				Option 3
			</Radio>
		</>
	);
}

function Disabled() {
	const [disabled, setDisabled] = useState(true);

	return (
		<div>
			<div style={ { display: 'flex', flexDirection: 'column', gap: '0.5em' } }>
				<Radio disabled={ disabled } name="disabled" value={ 1 }>
					Option 1
				</Radio>
				<Radio disabled={ disabled } name="disabled" value={ 2 }>
					Option 2
				</Radio>
			</div>
			<div style={ { marginTop: '1em' } }>
				<Button onClick={ () => setDisabled((v) => !v) }>
					{ disabled ? 'Enable' : 'Disable' }
				</Button>
			</div>
		</div>
	);
}

function HelpText() {
	return (
		<div>
			<div style={ { display: 'flex', flexDirection: 'column' } }>
				<Radio name="help" value={ 1 }>
					Option 1

					<p style={ { color: 'var(--text-muted)', marginBlockStart: '0.5em' } }>More detailed value</p>
				</Radio>
				<Radio name="help" value={ 2 }>
					Option 2

					<p style={ { color: 'var(--text-muted)', marginBlockStart: '0.5em' } }>More detailed value</p>
				</Radio>
			</div>
		</div>
	);
}

export { Example, Disabled, HelpText };
export default config;
