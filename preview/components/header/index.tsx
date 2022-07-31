import { Button } from '../../../src/components/button';
import { default as Menu } from '../../../src/icons/Menu2';
import { default as Moon } from '../../../src/icons/Moon';
import styles from '../../preview.module.less';
import { useEffect } from 'react';

type Props = {
	readonly open: boolean;
	readonly onToggle: () => void;
};

const html = window.document.documentElement;

let theme = window.localStorage.getItem('theme') || 'dark';

function toggleTheme() {
	theme = (theme === 'light') ? 'dark' : 'light';

	window.localStorage.setItem('theme', theme);
	html.dataset.theme = theme;
}

function Header(props: Props) {
	useEffect(function () {
		html.dataset.theme = theme;
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
			<div>
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
