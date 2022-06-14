import { Button } from '../../../src/components/button';
import { default as Menu } from '../../../src/icons/Menu2';
import { default as Moon } from '../../../src/icons/Moon';
import styles from '../../preview.module.less';

type Props = {
	readonly open: boolean;
	readonly onToggle: () => void;
};

const html = window.document.documentElement;

let theme = html.dataset.theme;

function toggleTheme() {
	theme = (theme === 'light') ? 'dark' : 'light';
	html.dataset.theme = theme;
}

function Header(props: Props) {
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
