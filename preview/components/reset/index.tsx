import { createElement } from 'react';
import styles from './reset.module.less';

const headings = new Array(6).fill(null).map(function (_, i) {
	return createElement('h' + ++i, { role: 'presentation', children: 'Heading h' + i });
});

function Reset() {
	return (
		<div className={ styles.reset }>
			<section>
				<h2>Typography</h2>
				<section>
					<h3>Headings</h3>
					<div>
						{ headings }
					</div>
				</section>
				<section>
					<h3>Paragraphs</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consequuntur
						cum facilis illo itaque laboriosam laborum non ut veritatis.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consequuntur
						cum facilis illo itaque laboriosam laborum non ut veritatis.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consequuntur
						cum facilis illo itaque laboriosam laborum non ut veritatis.
					</p>
				</section>
				<section>
					<h3>Special</h3>
					<p>
						<s>This text is strikethrough</s>
					</p>
					<p>
						<del>This text is deleted.</del>
					</p>
					<p>
						<i>This text is italic.</i>
					</p>
					<p>
						<b>This text is bold.</b>
					</p>
					<p>
						<u>This text is underlined.</u>
					</p>
					<p>
						This text has a <mark>marking</mark> in it.
					</p>
					<p>
						This text has a <del>deletion</del> and <ins>insertion</ins> in it.
					</p>
					<p>
						The <code>&lt;code&gt;</code> element can be used to mark code.
					</p>
					<p>
						The keyboard input element can used to
						show keys or computer output: <kbd>Alt</kbd> <kbd>F4</kbd>
					</p>
					<p>
						<abbr title="Hypertext Markup Language">HTML</abbr> is an abbreviation for Hypertext Markup
						Language.
					</p>
				</section>
			</section>
		</div>
	);
}

export { Reset };
