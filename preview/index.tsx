/// <reference types="vite/client" />
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, makeRoutes, Router } from 'react-even-better-router-dom';
import { Overview } from './components/overview';
import { Normalize } from './components/normalize';
import styles from './preview.module.less';
import { RenumProvider } from '../src';
import { Header } from './components/header';
import locale from '../src/locale/en-us';
import { default as ExternalLink } from '../src/icons/ExternalLink';
import '../src/styles/renum.less';
import { Example } from './components/example';
import { capitalize } from './utils';

const EXTERNAL_ICON = <ExternalLink />;

const components = [
	'alert',
	'button',
	'checkbox',
	'dialog',
	'input',
	'loading',
	'radio',
	'select',
	'tooltip',
] as const;

const ROUTES = makeRoutes({
	'': Overview,
	'/normalize': Normalize,
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
							{ components.map(function (component) {
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
					<h1>idk</h1>
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

const el = document.querySelector('#app');

if (!el) {
	throw new Error('Could not find app root');
}

createRoot(el).render(<Providers />);
