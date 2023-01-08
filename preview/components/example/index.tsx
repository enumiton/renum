import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Alert } from '../../../src/components/alert';
import styles from './example.module.less';

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
	readonly dir: string;
};

function Example({ dir }: Props) {
	const [components, setComponents] = useState<Imports>({});

	// @ts-ignore
	const alerts = components['default']?.['alerts'] as (Alert[] | undefined);

	async function get() {
		setComponents(await import(`../../../src/components/${ dir }/${ dir }.preview.tsx`));
	}

	useEffect(function () {
		void get();
	}, []);

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
		</div>
	);
}

export { Example };
