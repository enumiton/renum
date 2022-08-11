import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
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
	readonly component: string;
};

function Example({ component }: Props) {
	const [components, setComponents] = useState<Imports>({});
	const mounted = useRef(false);

	// @ts-ignore
	const alerts = components['default']?.['alerts'] as (Alert[] | undefined);

	async function get() {
		setComponents(await import(`../../../src/components/${ component }/${ component }.preview.tsx`));
	}

	useEffect(function () {
		if (!mounted.current) {
			void get();
		}

		mounted.current = true;
	}, []);

	return (
		<div>
			{ (alerts && alerts.length > 0) ? (
				<div>
					{ alerts.map(function (alert, i) {
						return (
							<div key={ i }>
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
		</div>
	);
}

export { Example };
