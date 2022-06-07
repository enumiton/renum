import { FC, useEffect, useState } from 'react';
import styles from './example.module.less';
import { Loading } from '../../../src';

type Imports = { [key: string]: (FC | { readonly title: string; }); };

type Props = {
	readonly components: () => Promise<Imports>;
};

function Example(props: Props) {
	const [components, setComponents] = useState<Imports>({});

	async function get() {
		setComponents(await props.components());
	}

	useEffect(function () {
		get();
	}, []);

	if (Object.keys(components).length <= 0) {
		return <Loading active />;
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
