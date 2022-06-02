/// <reference types="vite/client" />
import { Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Overview } from './preview/overview';
import styles from './preview.module.less';
import './src/styles/reset.less';
import { capitalize } from './utils';
import { Example } from './preview/example';
import { Button } from './src/components/button/button';

const _ = import.meta.globEager('./src/components/*/style/index.less');
const modules = import.meta.glob('./src/components/**/*.preview.tsx');

const imports = Object.entries(modules).map(function ([path, module]) {
	const key = path.split('/').pop()!.split('.').shift()!;

	return [key, module] as const;
});

const menu = <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;

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
						icon={ menu }
						type="invisible"
						shape="circle"
						onClick={ () => setOpen((v) => !v) }
						aria-label={ open ? 'Close sidemenu' : 'Open sidemenu' }
						aria-live="polite"
					/>
					<span className={ styles.logo }>RENUM</span>
				</div>
				<div>
					<Button onClick={ () => setTheme((v) => v === 'light' ? 'dark' : 'light') }>
						Change theme
					</Button>
				</div>
			</header>
			<div className={ styles.container }>
				<aside className={ `${styles.aside} ${open ? styles.open : ''}` }>
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
			</div>
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
