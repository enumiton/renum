import { capitalize } from '../../utils';
import styles from './colors.module.less';

const COLORS = ['primary', 'complementary', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink', 'gray'];

function Color({ color }: { readonly color: string }) {
	const gray = (color === 'gray');

	return (
		<section className={ styles.color }>
			<h3>{ capitalize(color) }</h3>
			<ul className={ styles.row2 } role="list">
				{ Array(gray ? 25 : 9).fill(null).map(function (_, i) {
					const key = gray ? (i).toString() : ((i + 1) + '00');

					return (
						<li key={ key } style={ { backgroundColor: `var(--${ color }-${ key })` } }>
							{ key.padStart(2, '0') }
						</li>
					);
				}) }
			</ul>
		</section>
	);
}

function Colors() {
	return (
		<div className={ styles.row }>
			{ COLORS.map(function (c, i) {
				return (
					<Color key={ i } color={ c } />
				);
			}) }
		</div>
	);
}

export { Colors };
