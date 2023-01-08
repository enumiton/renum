/// <reference types="vite/client" />
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { RouteObject } from 'react-router-dom';
import { BrowserRouter, Link, useLocation, useRoutes } from 'react-router-dom';
import { Overview } from './components/overview';
import { Reset } from './components/reset';
import styles from './preview.module.less';
import { capitalize, MODULES } from './utils';
import { RenumProvider } from '../src';
import { Header } from './components/header';
import { Example } from './components/example';
import locale from '../src/locale/en-us';
import { default as ExternalLink } from '../src/icons/ExternalLink';
import '../src/styles/themes.less';
import '../src/styles/normalize.less';

import.meta.glob('../src/components/*/style/index.less', { eager: true });

const keys = Object.keys(MODULES).map((key) => key.split('/').pop()!.split('.').shift()!);

const EXTERNAL_ICON = <ExternalLink />;

function generateRoutes(): RouteObject[] {
	return [
		{
			path: '/',
			element: <Overview />,
		},
		{
			path: '/reset',
			element: <Reset />,
		},
		{
			path: '/components',
			children: [
				{
					index: true,
					element: <Overview />,
				},
				...(keys.map(function (key) {
					return {
						path: key,
						element: Example({ dir: key }),
					};
				})),
			],
		},
	];
}

function App() {
	const { pathname } = useLocation();

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('Overview — Renum');

	const routes = useRoutes(generateRoutes());

	function handleLocation() {
		let title = (pathname === '/') ? 'Overview' : pathname.split('/').pop()!.replaceAll('-', ' ');
		title = capitalize(title);

		window.document.title = title + ' \u2022 Renum';
		setTitle(title);
	}

	useEffect(handleLocation, [pathname]);

	return (
		<>
			<Header open={ open } onToggle={ () => setOpen((v) => !v) } />
			<div className={ styles.container }>
				<aside className={ `${ styles.aside } ${ open ? styles.open : '' }` }>
					<h2>Components</h2>
					<nav>
						<ul role="list">
							<li>
								<Link to="/">
									Overview
								</Link>
							</li>
							<li>
								<Link to="/reset">
									Reset styles { EXTERNAL_ICON }
								</Link>
							</li>
							<li>
								<a href="https://tabler-icons.io" target="_blank" rel="nofollow noreferrer">
									Icons
								</a>
							</li>
							{ keys.map(function (key, i) {
								return (
									<li key={ i }>
										<Link to={ '/components/' + key }>
											{ capitalize(key) }
										</Link>
									</li>
								);
							}) }
						</ul>
					</nav>
				</aside>
				<main id="main" className={ styles.main }>
					<h1>{ title }</h1>
					{ routes }
				</main>
			</div>
		</>
	);
}

function Providers() {
	return (
		<StrictMode>
			<RenumProvider locale={ locale }>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</RenumProvider>
		</StrictMode>
	);
}

const el = document.querySelector('#app');

if (!el) {
	throw new Error('Could not find app root');
}

createRoot(el).render(<Providers />);
