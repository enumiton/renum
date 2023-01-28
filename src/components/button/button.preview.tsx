import { useEffect, useState } from 'react';
import { Button } from './button';
import { default as Send } from '../../icons/Send';
import { default as External } from '../../icons/ExternalLink';
import { default as AlignLeft } from '../../icons/AlignLeft';
import { default as AlignCenter } from '../../icons/AlignCenter';
import { default as AlignRight } from '../../icons/AlignRight';

const config = {
	title: 'button',
	description: 'They click and clack around.',
};

function Types() {
	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button type="default">Default</Button>
			<Button type="primary">Primary</Button>
			<Button type="muted">Muted</Button>
			<Button type="complementary">Complementary</Button>
			<Button type="link">Link</Button>
			<Button type="text">Text</Button>
			<Button type="border">Border</Button>
			<Button type="border-primary">Border primary</Button>
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
				icon={ <Send /> }
				aria-label="Circular shape"
			/>
		</div>
	);
}

function Loading() {
	const [loading, setLoading] = useState(true);

	useEffect(function () {
		if (loading) {
			window.setTimeout(function () {
				setLoading(false);
			}, 2000);
		}
	}, [loading]);

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
			<Button icon={ <Send /> }>Icon</Button>
			<Button suffix={ <External /> }>Suffix</Button>
		</div>
	);
}

function Group() {
	return (
		<Button.Group>
			<Button icon={ <AlignLeft /> } aria-label="Align text left" />
			<Button icon={ <AlignCenter /> } aria-label="Align text center" />
			<Button icon={ <AlignRight /> } aria-label="Align text right" />
		</Button.Group>
	);
}

export { Types, Radius, Loading, Block, Icons, Group };
export default config;
