import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Alert, Loading } from '../../../src';
import styles from './example.module.less';
import type { RouteComponentProps } from 'react-even-better-router-dom';
import { capitalize } from '../../utils';

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

function Example(props: RouteComponentProps) {
	const component = props.match.component?.toString();

	const [components, setComponents] = useState<Imports>({});
	const [loading, setLoading] = useState(false);

	// @ts-ignore
	const alerts = components['default']?.['alerts'] as (Alert[] | undefined);

	async function get() {
		setComponents(await import(`../../../src/components/${ component }/${ component }.preview.tsx`));
	}

	useEffect(function () {
		if (!component) {
			return;
		}

		window.document.title = capitalize(component) + ' \u2022 Renum';

		setLoading(true);

		get()
			.finally(function () {
				return setLoading(false);
			});
	}, [component]);

	return (
		<div>
			{ (alerts && alerts.length > 0) ? (
				<div>
					{ alerts.map(function (alert, i) {
						return (
							<Alert key={ i } type="light">
								{ alert.description }
							</Alert>
						);
					}) }
				</div>
			) : null }
			{ loading ? (
				<div style={ { textAlign: 'center' } }>
					<Loading active />
				</div>
			) : (
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
			) }
		</div>
	);
}

export { Example };
