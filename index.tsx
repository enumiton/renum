/// <reference types="vite/client" />
import { Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Overview } from './preview/overview';
import styles from './preview.module.less';
import './src/styles/reset.less';
import { capitalize } from './utils';
import { Example } from './preview/example';

const modules = import.meta.glob('./src/components/**/*.preview.tsx');

const imports = Object.entries(modules).map(function ([path, module]) {
	const key = path.split('/').pop()!.split('.').shift()!;

	return [key, module] as const;
});

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
			<header className={ styles.header }>
				<a className={ styles.skip } href="#main">Skip to main</a>
				<span className={ styles.logo }>RENUM</span>
			</header>
			<aside className={ `${ styles.aside } ${ open ? styles.asideOpen : '' }` }>
				<h2>Components</h2>
				<Suspense fallback="Loading components...">
					<nav>
						<ul>
							<li>
								<Link to="/">
									Overview
								</Link>
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
				</Suspense>
			</aside>
			<main id="main" className={ styles.main }>
				<h1>{ title }</h1>
				<Routes>
					<Route path="/" element={ <Overview /> } />
					{ imports.map(function ([key, module], i) {
						return (
							<Route
								key={ i }
								path={ '/components/' + key }
								element={ <Example title={ title } components={ module } /> }
							/>
						);
					}) }
				</Routes>
			</main>
			<footer className={ styles.footer }>
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
