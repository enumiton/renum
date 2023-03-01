/// <reference types="vite/client" />
import { StrictMode, useState } from 'react';
import { Link, makeRoutes, Router } from 'react-even-better-router-dom';
import { Overview } from './components/overview';
import { Normalize } from './components/normalize';
import styles from './preview.module.less';
import { RenumProvider } from '../src';
import { Header } from './components/header';
import locale from '../src/locale/en-us';
import { default as ExternalLink } from '../src/icons/ExternalLink';
import { Example } from './components/example';
import { Colors } from './components/colors';
import { capitalize } from './utils';
import '../src/styles/renum.less';

const EXTERNAL_ICON = <ExternalLink />;

const COMPONENTS = [
	'alert',
	'button',
	'checkbox',
	'dialog',
	'input',
	'loading',
	'listbox',
	'radio',
	'select',
	'tooltip',
] as const;

const ROUTES = makeRoutes({
	'': Overview,
	'/normalize': Normalize,
	'/colors': Colors,
	'/components/:component': Example,
});

function App() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Header open={ open } onToggle={ () => setOpen((v) => !v) } />
			<div className={ styles.container }>
				<aside className={ `${ styles.aside } ${ open ? styles.open : '' }` }>
					<h2>Components</h2>
					<nav>
						<ul role="list">
							<li>
								<Link href={ ROUTES.url(Overview) }>
									Overview
								</Link>
							</li>
							<li>
								<Link href={ ROUTES.url(Normalize) }>
									Normalize
								</Link>
							</li>
							<li>
								<Link href={ ROUTES.url(Colors) }>
									Colors
								</Link>
							</li>
							<li>
								<hr />
							</li>
							<li>
								<a href="https://tabler-icons.io" target="_blank" rel="nofollow noreferrer">
									Icons { EXTERNAL_ICON }
								</a>
							</li>
							<li>
								<hr />
							</li>
							{ COMPONENTS.map(function (component) {
								return (
									<li key={ component }>
										<Link href={ ROUTES.url(Example, { component }) }>
											{ capitalize(component) }
										</Link>
									</li>
								);
							}) }
						</ul>
					</nav>
				</aside>
				<main id="main" className={ styles.main }>
					<Router routes={ ROUTES } />
				</main>
			</div>
		</>
	);
}

function Providers() {
	return (
		<StrictMode>
			<RenumProvider locale={ locale }>
				<App />
			</RenumProvider>
		</StrictMode>
	);
}

export { COMPONENTS, ROUTES, App, Providers };
