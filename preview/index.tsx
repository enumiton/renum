/// <reference types="vite/client" />
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Overview } from './components/overview';
import styles from './preview.module.less';
import { capitalize } from './utils';
import { Example } from './components/example';
import { RenumProvider } from '../src';
import { Icons } from './components/icons';
import '../src/styles/reset.less';
import { Header } from './components/header';

// @ts-ignore
const _ = import.meta.globEager('../src/components/*/style/index.less');
const modules = import.meta.glob('../src/components/**/*.preview.tsx');

const imports = Object.entries(modules).map(function ([path, module]) {
	const key = path.split('/').pop()!.split('.').shift()!;

	return [key, module] as const;
});

function App() {
	const { pathname } = useLocation();

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('Overview — Renum');

	function handleLocation() {
		let title = (pathname === '/') ? 'Overview' : pathname.split('/').pop()!.replaceAll('-', ' ');
		title = capitalize(title);

		window.document.title = title + ' — Renum';
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
						<ul>
							<li>
								<Link to="/">
									Overview
								</Link>
							</li>
							<li>
								<Link to="/icons">
									Icons
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
				</aside>
				<main id="main" className={ styles.main }>
					<h1>{ title }</h1>
					<Routes>
						<Route index element={ <Overview /> } />
						<Route path="/icons" element={ <Icons /> } />
						<Route path="/components">
							<Route index element={ <Overview /> } />
							{ imports.map(function ([key, module], i) {
								return (
									<Route
										key={ i }
										path={ key }
										element={ <Example components={ module } /> }
									/>
								);
							}) }
						</Route>
					</Routes>
				</main>
			</div>
			<footer className={ styles.footer }>
				RENUM &copy; { new Date().getFullYear() }
			</footer>
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
