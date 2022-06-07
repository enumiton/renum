import { useState } from 'react';
import { Button } from './button';
import { default as Menu } from '../../icons/Menu2';

const config = {
	title: 'button',
};

function Types() {
	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button type="default">Default</Button>
			<Button type="primary">Primary</Button>
			<Button type="complementary">Complementary</Button>
			<Button type="light">Light</Button>
			<Button type="invisible">Invisible</Button>
			<Button type="ghost">Ghost</Button>
			<Button dashed>Dashed border</Button>
			<Button disabled>Disabled</Button>
		</div>
	);
}

function Radius() {
	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button>Default</Button>
			<Button shape="round">Roundish</Button>
			<Button shape="pill">Pill shape</Button>
			<Button
				shape="circle"
				icon={ <Menu /> }
				aria-label="Circular shape"
			/>
		</div>
	);
}

function Loading() {
	const [loading, setLoading] = useState(true);

	return (
		<div>
			<Button loading={ loading } onClick={ () => setLoading((v) => !v) }>
				{ loading ? 'Loading...' : 'Loaded!' }
			</Button>
		</div>
	);
}

function Block() {
	return (
		<div>
			<Button>Default</Button>
			<Button block style={ { marginTop: '0.5em' } }>Block</Button>
		</div>
	);
}

function Icons() {
	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button icon={ <Menu /> }>Icon</Button>
			<Button suffix={ <Menu /> }>Suffix</Button>
		</div>
	);
}

export { Types, Radius, Loading, Block, Icons };
export default config;
