import { Button } from '../../../src';
import { default as Menu } from '../../../src/icons/Menu2';
import { default as Moon } from '../../../src/icons/Moon';
import { default as TextDirectionRtl } from '../../../src/icons/TextDirectionRtl';
import { default as BrandGithub } from '../../../src/icons/BrandGithub';
import { useEffect, useState } from 'react';
import styles from '../../preview.module.less';

type Props = {
	readonly open: boolean;
	readonly onToggle: () => void;
};

type Theme = 'dark' | 'light';
type Dir = 'rtl' | 'ltr';

function sanitizeTheme(theme: string | null): Theme | undefined {
	return (theme === 'dark' || theme === 'light') ? theme : undefined;
}

function sanitizeDir(dir: string | null): Dir | undefined {
	return (dir === 'ltr' || dir === 'rtl') ? dir : undefined;
}

function Header(props: Props) {
	const [theme, setTheme] = useState<Theme | undefined>(sanitizeTheme(window.localStorage.getItem('theme')));
	const [dir, setDir] = useState<Dir | undefined>(sanitizeDir(window.localStorage.getItem('dir')));

	useEffect(function () {
		const html = window.document.documentElement;

		if (theme) {
			html.classList.remove('re-dark', 're-light');
			html.classList.add(`re-${ theme }`);
			window.localStorage.setItem('theme', theme);
		}

		if (dir) {
			html.dir = dir;
			window.localStorage.setItem('dir', dir);
		}
	}, [theme, dir]);

	return (
		<header className={ styles.header }>
			<a className={ styles.skip } href="#main">Skip to main</a>
			<div className={ styles.row }>
				<Button
					icon={ <Menu /> }
					type="invisible"
					shape="circle"
					onClick={ props.onToggle }
					aria-label={ props.open ? 'Close sidemenu' : 'Open sidemenu' }
					aria-live="polite"
				/>
				<span className={ styles.logo }>Renum</span>
			</div>
			<div className={ styles.row }>
				<a
					target="_blank"
					href="https://github.com/enumiton/renum"
					aria-label="Open GitHub repository"
					title="Open GitHub repository"
				>
					<BrandGithub />
				</a>
				<Button
					type="invisible"
					icon={ <TextDirectionRtl /> }
					onClick={ () => setDir((state) => state === 'ltr' ? 'rtl' : 'ltr') }
					aria-label="Change color theme"
				/>
				<Button
					type="invisible"
					icon={ <Moon /> }
					onClick={ () => setTheme((state) => state === 'dark' ? 'light' : 'dark') }
					aria-label="Change color theme"
				/>
			</div>
		</header>
	);
}

export { Header };
