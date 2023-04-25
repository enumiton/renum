import { TextArea } from './text-area.js';

const config = {
	title: 'text-area',
};

const initValue = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi corporis minus possimus.';

function Simple() {
	return (
		<label>
			Lorem
			<TextArea defaultValue={ initValue } />
		</label>
	);
}

function autoResize() {
	return (
		<label>
			Lorem
			<TextArea defaultValue={ initValue } autoResize rows={ 2 } resize={ false } />
		</label>
	);
}

function Resizable() {
	return (
		<label>
			Lorem
			<TextArea defaultValue={ initValue } resize="both" />
		</label>
	);
}

export { Simple, autoResize, Resizable };
export default config;
