import { useEffect } from 'react';

function Example(props: { title: string; components: PlaygroundComponent }) {
	useEffect(function () {
		window.document.title = props.title + ' — Renum';
	}, []);

	return (
		<div>
			{ Object.entries(props.components).map(function ([key, Component], i) {
				return (
					<section key={ i }>
						<h2>{ key }</h2>
						<Component />
					</section>
				);
			}) }
		</div>
	);
}

export { Example };
