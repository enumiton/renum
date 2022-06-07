/// <reference types="vite/client" />
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Overview } from './preview/overview';
import styles from './preview.module.less';
import './src/styles/reset.less';
import { capitalize } from './utils';
import { Example } from './preview/example';
import { Button } from './src/components/button/button';
import { default as Menu } from './src/icons/Menu2';
import { Icons } from './preview/icons';
import Moon from './src/icons/Moon';

const _ = import.meta.globEager('./src/components/*/style/index.less');
const modules = import.meta.glob('./src/components/**/*.preview.tsx');

const imports = Object.entries(modules).map(function ([path, module]) {
	const key = path.split('/').pop()!.split('.').shift()!;

	return [key, module] as const;
});

function App() {
	const { pathname } = useLocation();

	const [open, setOpen] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');
	const [title, setTitle] = useState('Overview — Renum');

	function handleLocation() {
		let title = (pathname === '/') ? 'Overview' : pathname.split('/').pop()!.replaceAll('-', ' ');
		title = capitalize(title);

		window.document.title = title + ' — Renum';
		setTitle(title);
	}

	useEffect(function () {
		window.document.documentElement.dataset.theme = theme;
	}, [theme]);

	useEffect(handleLocation, [pathname]);

	return (
		<>
			<header className={ styles.header }>
				<a className={ styles.skip } href="#main">Skip to main</a>
				<div>
					<Button
						icon={ <Menu /> }
						type="invisible"
						shape="circle"
						onClick={ () => setOpen((v) => !v) }
						aria-label={ open ? 'Close sidemenu' : 'Open sidemenu' }
						aria-live="polite"
					/>
					<span className={ styles.logo }>RENUM</span>
				</div>
				<div>
					<Button
						type="invisible"
						icon={ <Moon /> }
						onClick={ () => setTheme((v) => v === 'light' ? 'dark' : 'light') }
					>
						Change theme
					</Button>
				</div>
			</header>
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
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StrictMode>
	);
}

const el = document.querySelector('#app');

if (!el) {
	throw new Error('Could not find app root');
}

createRoot(el).render(<Providers />);
