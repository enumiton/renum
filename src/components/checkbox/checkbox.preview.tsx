import { Checkbox } from './checkbox';

const config = {
	title: 'checkbox',
};

function Simple() {
	return (
		<div style={ { display: 'flex', flexDirection: 'column', gap: '0.5em' } }>
			<Checkbox name="simple" value={ 1 } label="Option 1" disabled />
			<Checkbox name="simple" value={ 2 } label="Option 2" />
			<Checkbox name="simple" value={ 3 }>
				Option 3
			</Checkbox>
		</div>
	);
}

export { Simple };
export default config;
