import { Alert } from './alert';
import { Button } from '../button';

const config = {
	title: 'alert',
};

function Simple() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
			<Alert type="light">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="primary">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="info">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="success">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="danger">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="error">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
		</div>
	);
}

function Banner() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
			<Alert type="light" banner>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="primary" banner>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="info" banner>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="success" banner>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="danger" banner>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert type="error" banner>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
		</div>
	);
}

function Closeable() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '1em' } }>
			<Alert title="Closeable alert" closeable>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
			<Alert title="Unclose-able alert">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
		</div>
	);
}

function Actions() {
	return (
		<div>
			<Alert
				title="An error has occurred!"
				closeable
				actions={ [
					<Button key="report" type="primary">
						Report issue
					</Button>,
					<Button key="reload" type="text">
						Reload page
					</Button>,
				] }
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, sequi.
			</Alert>
		</div>
	);
}

export { Simple, Banner, Closeable, Actions };
export default config;
