import { Input } from './input';
import User from '../../icons/User';
import { Button } from '../button';

const config = {
	title: 'input',
};

function Simple() {
	return (
		<Input placeholder="Placeholder" />
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
				<Input wrapperStyle={ { fontSize: '0.875em' } } defaultValue="Small" icon={ <User /> } />
				<Input defaultValue="Default" icon={ <User /> } />
				<Input wrapperStyle={ { fontSize: '1.125em' } } defaultValue="Large" icon={ <User /> } />
			</div>
		</div>
	);
}

function Fixes() {
	return (
		<div>
			<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
				<Input prefix="Prefix" />
				<Input suffix="Suffix" />
				<Input prefix="Prefix" defaultValue="and" suffix="Suffix" icon={ <User /> } />
				<Input
					suffix={ (
						<Button>Search</Button>
					) }
				/>
				<Input wrapperStyle={ { fontSize: '1.125em' } } defaultValue="Large" />
			</div>
		</div>
	);
}

function Borderless() {
	return (
		<Input borderless defaultValue="Borderless" />
	);
}

export { Simple, Icon, Size, Fixes, Borderless };
export default config;
