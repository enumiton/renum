import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styles from './example.module.less';
import { Loading } from '../../../src';

type Alert = {
	readonly title?: string;
	readonly description?: string | ReactNode;
}

type Imports = {
	[key: string]: (FC | {
		readonly title: string;
		readonly alerts?: Alert[];
	});
};

type Props = {
	readonly components: () => Promise<Imports>;
};

function Example(props: Props) {
	const [components, setComponents] = useState<Imports>({});

	// @ts-ignore
	const alerts = components['default']?.['alerts'] as (Alert[] | undefined);

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
		<>
			{ (alerts && alerts.length > 0) ? (
				<div>
					{ alerts.map(function (alert) {
						return (
							<div>
								<p>
									{ alert.description }
								</p>
							</div>
						);
					}) }
				</div>
			) : null }
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
		</>
	);
}

export { Example };
