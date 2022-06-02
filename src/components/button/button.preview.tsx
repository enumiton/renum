import { useState } from 'react';
import { Button } from './button';
import './style/index.less';

const config = {
	title: 'button',
};

const menu = <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;

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
				icon={ menu }
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
			<Button block style={ { marginTop: "0.5em" } }>Block</Button>
		</div>
	);
}

function Icons() {
	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button icon={ menu }>Icon</Button>
			<Button suffix={ menu }>Suffix</Button>
		</div>
	);
}

export { Simple, Types, Radius, Loading, Block, Icons };
export default config;
