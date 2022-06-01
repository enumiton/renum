import { Button } from './button';
import './style/index.less';

const config = {
	title: 'button',
};

function Simple() {
	return (
		<div>
			<Button>Button</Button>
		</div>
	);
}

function Types() {
	return (
		<div style={ { display: 'flex', flexFlow: 'row wrap', gap: '0.5em' } }>
			<Button type="default">Default</Button>
			<Button type="primary">Primary</Button>
			<Button type="secondary">Secondary</Button>
			<Button type="light">Light</Button>
			<Button type="invisible">Invisible</Button>
			<Button type="ghost">Ghost</Button>
			<Button type="link">Link</Button>
			<Button dashed>Dashed border</Button>
		</div>
	);
}

export { Simple, Types };
export default config;
