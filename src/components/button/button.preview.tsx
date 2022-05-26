import { Button } from './button';
import './style/index.less';

const config: PlaygroundConfig = {
	title: 'button',
};

function Simple() {
	return (
		<div>
			<Button>Button</Button>
		</div>
	);
}

export { Simple };
export default config;
