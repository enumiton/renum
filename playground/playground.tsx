/// <reference types="vite/client" />
import { Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Overview } from './overview';
import { Example } from './example';
import './playground.less';
import '../src/styles/reset.less';

/*
 * @todo lazy load components
 */

// @ts-ignore
const glob = import.meta.glob<PlaygroundFile>('../src/components/*/*.playground.tsx');
// @ts-ignore
const files = (await Promise.all(Object.values(glob).map((factory) => factory()))) as PlaygroundFile[];

import.meta.globEager('./src/components/*/style/index.less');

function App() {
	const { pathname } = useLocation();

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('Overview — Renum');

	function handleLocation() {
		const title = (pathname === '/') ? 'Overview' : pathname.split('/').pop()!.replaceAll('-', ' ');

		window.document.title = title + ' — Renum';
		setTitle(title);
	}

	useEffect(handleLocation, [pathname]);

	return (
		<>
			<header className="header">
				<a href="#main">Skip to main</a>
				<span className="header__logo">RENUM</span>
			</header>
			<aside className={ `aside ${ open ? 'aside--open' : '' }` }>
				<h2>Components</h2>
				<Suspense fallback="Loading components...">
					<nav>
						<ul>
							<li>
								<Link to="/">
									Overview
								</Link>
							</li>
							{ files.map(function (file, i) {
								return (
									<li key={ i }>
										<Link to={ '/components/' + file.default.title }>
											{ file.default.title }
										</Link>
									</li>
								);
							}) }
						</ul>
					</nav>
				</Suspense>
			</aside>
			<main id="main" className="main">
				<h1>{ title }</h1>
				<Routes>
					<Route path="/" element={ <Overview /> } />
					{ files.map(function (file, i) {
						const { default: { title }, ...examples } = file;

						return (
							<Route
								key={ i }
								path={ '/components/' + title }
								element={ <Example title={ title } components={ examples } /> }
							/>
						);
					}) }
				</Routes>
			</main>
			<footer className="footer">
				RENUM &copy; { new Date().getFullYear() }
			</footer>
		</>
	);
}

function Providers() {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}

const el = document.querySelector('#app');

if (!el) {
	throw new Error('Could not find app root');
}

createRoot(el).render(<Providers />);
