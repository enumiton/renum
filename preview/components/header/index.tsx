import { Button } from '../../../src';
import { default as Menu } from '../../../src/icons/Menu2';
import { default as Moon } from '../../../src/icons/Moon';
import { default as TextDirectionRtl } from '../../../src/icons/TextDirectionRtl';
import { default as BrandGithub } from '../../../src/icons/BrandGithub';
import { useEffect } from 'react';
import styles from '../../preview.module.less';

type Props = {
	readonly open: boolean;
	readonly onToggle: () => void;
};

const html = window.document.documentElement;

let theme = window.localStorage.getItem('theme') || 'dark';
let td = window.localStorage.getItem('td') || 'ltr';

function toggleTheme() {
	theme = (theme === 'light') ? 'dark' : 'light';

	window.localStorage.setItem('theme', theme);
	html.dataset.theme = theme;
}

function toggleTextDirection() {
	td = (td === 'ltr') ? 'rtl' : 'ltr';

	window.localStorage.setItem('td', td);
	html.dir = td;
}

function Header(props: Props) {
	useEffect(function () {
		html.dataset.theme = (theme === 'light') ? 'light' : 'dark';
		html.dir = (td === 'rtl') ? 'rtl' : 'ltr';
	}, []);

	return (
		<header className={ styles.header }>
			<a className={ styles.skip } href="#main">Skip to main</a>
			<div>
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
			<div className={ styles.rhs }>
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
					onClick={ toggleTextDirection }
					aria-label="Change color theme"
				/>
				<Button
					type="invisible"
					icon={ <Moon /> }
					onClick={ toggleTheme }
					aria-label="Change color theme"
				/>
			</div>
		</header>
	);
}

export { Header };
