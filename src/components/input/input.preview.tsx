import { Input } from './input';
import User from '../../icons/User';
import { Button } from '../button';
import { default as Search } from '../../icons/Search';
import { default as Dice } from '../../icons/Dice';
import { useState } from 'react';

const config = {
	title: 'input',
	alerts: [
		{
			description: (
				<>Since <code>StrictMode</code> will render every component twice, the <code>defaultValue</code> attribute will overwritten</>
			),
		},
	],
};

function Simple() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
			<Input placeholder="Placeholder" />
			<Input value="Readonly" readOnly />
			<Input value="Disabled" disabled />
		</div>
	);
}

function Icon() {
	return (
		<Input icon={ <User /> } />
	);
}

function Size() {
	return (
		<div>
			<p>
				To change the size of the input you only need to change the <code>font-size</code> of the input or any of its parents.
			</p>
			<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
				<Input wrapperStyle={ { fontSize: '0.875em' } } value="Small" icon={ <User /> } />
				<Input value="Default" icon={ <User /> } />
				<Input wrapperStyle={ { fontSize: '1.125em' } } value="Large" icon={ <User /> } />
			</div>
		</div>
	);
}

function Fixes() {
	const [value, setValue] = useState('');

	return (
		<div>
			<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
				<Input prefix="Prefix" />
				<Input suffix="Suffix" />
				<Input
					placeholder="Search…"
					suffix={ (
						<Button icon={ <Search /> }>Search</Button>
					) }
				/>
				<Input
					value={ value }
					onChange={ function (e) {
						console.log(e.target.value);
						setValue(e.target.value);
					} }
					suffix={ (
						<Button
							aria-label="Insert random value"
							title="Insert random value"
							onClick={ function () {
								return setValue((Math.random()).toString(36).substring(2));
							} }
							icon={ <Dice /> }
						/>
					) }
				/>
			</div>
		</div>
	);
}

function Borderless() {
	return (
		<Input borderless value="Borderless" />
	);
}

export { Simple, Icon, Size, Fixes, Borderless };
export default config;
