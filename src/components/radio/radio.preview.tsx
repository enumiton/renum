import { Radio } from './radio';
import { useState } from 'react';
import { Button } from '../button';
import '../button/style/index.less';

const config = {
	title: 'radio',
};

function Example() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '0.5em' } }>
			<Radio name="sample" value={ 1 }>
				Option 1
			</Radio>
			<Radio name="sample" value={ 2 }>
				Option 2
			</Radio>
			<Radio name="sample" value={ 3 }>
				Option 3
			</Radio>
		</div>
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

export { Example, Disabled };
export default config;
