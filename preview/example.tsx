import { FC, useEffect, useState } from 'react';
import styles from './example.module.less';

type Imports = { [key: string]: (FC | { readonly title: string; }) };

type Props = {
	readonly title: string;
	readonly components: () => Promise<Imports>;
};

function Example(props: Props) {
	const [components, setComponents] = useState<Imports>({});

	async function get() {
		setComponents(await props.components());
	}

	useEffect(function () {
		window.document.title = props.title + ' — Renum';
		get();
	}, []);

	if (Object.keys(components).length <= 0) {
		return <span>Loading...</span>;
	}

	return (
		<div className={ styles.container }>
			{ Object.entries(components).map(function ([key, Component], i) {
				if (typeof Component === 'object' && 'title' in Component) {
					return;
				}

				return (
					<section key={ i } className={ styles.section }>
						<h2>{ key }</h2>
						<Component />
					</section>
				);
			}) }
		</div>
	);
}

export { Example };