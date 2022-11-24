/// <reference types="vite/client" />
import type { FC } from 'react';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { RouteObject } from 'react-router-dom';
import { BrowserRouter, Link, useLocation, useRoutes } from 'react-router-dom';
import { Overview } from './components/overview';
import { Reset } from './components/reset';
import styles from './preview.module.less';
import { capitalize } from './utils';
import { RenumProvider } from '../src';
import { Header } from './components/header';
import { Example } from './components/example';
import '../src/styles/reset.less';

import.meta.glob('../src/components/*/style/index.less', { eager: true });

const modules = import.meta.glob<FC>('../src/components/**/*.preview.tsx');

const imports = Object.entries(modules).map(function ([path, module]) {
	const key = path.split('/').pop()!.split('.').shift()!;

	return [key, module] as const;
});

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
				...(imports.map(function ([key]) {
					return {
						path: key,
						// 🫠
						element: Example({ component: key }),
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
									Reset styles
								</Link>
							</li>
							<li>
								<a href="https://tabler-icons.io" target="_blank" rel="nofollow noreferrer">
									Icons
								</a>
							</li>
							{ imports.map(function ([key], i) {
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
			<RenumProvider>
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
