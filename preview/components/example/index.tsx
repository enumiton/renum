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

interface Config {
	title: string;
	description?: string | undefined;
	alerts?: Alert[] | undefined;
}

interface Imports {
	default: Config;

	[key: string]: FC | Config;
}

function Example(props: RouteComponentProps) {
	const component = props.match.component?.toString();

	const [components, setComponents] = useState<Imports | undefined>();

	// @ts-ignore
	const alerts = components?.['default']?.['alerts'];
	const description = components?.['default']?.['description'];

	async function get() {
		setComponents(await import(`../../../src/components/${ component }/${ component }.preview.tsx`));
	}

	useEffect(function () {
		if (!component) {
			return;
		}

		window.document.title = capitalize(component) + ' \u2022 Renum';

		void get();
	}, [component]);

	return (
		<>
			<div className={ styles.header }>
				<h1>{ capitalize(component ?? '') }</h1>
				{ (description) ? (
					<p>{ description }</p>
				) : null }
			</div>
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
			{ (!components) ? (
				<div style={ { textAlign: 'center' } }>
					<Loading active />
				</div>
			) : (
				<div className={ styles.examples }>
					{ Object.entries(components).map(function ([key, Component], i) {
						if ('title' in Component) {
							return;
						}

						return (
							<section key={ i }>
								<h2>{ key }</h2>
								<Component />
							</section>
						);
					}) }
				</div>
			) }
		</>
	);
}

export { Example };
