import { createElement } from 'react';
import styles from './normalize.module.less';

const headings = new Array(6).fill(null).map(function (_, i) {
	return createElement('h' + ++i, { role: 'presentation', children: 'Heading h' + i });
});

function Normalize() {
	return (
		<div className={ styles.normalize }>
			<section>
				<h2>Headings</h2>
				<div>
					{ headings }
				</div>
			</section>
			<section>
				<h2>Paragraphs</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consequuntur
					cum facilis illo itaque laboriosam laborum non ut veritatis.
				</p>
				<hr />
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
				<h2>Lists</h2>
				<ul>
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Consectetur adipisicing elit.</li>
					<li>Aspernatur eum explicabo facere fugiat ipsam libero.</li>
					<li>Minima necessitatibus saepe sapiente voluptatibus.</li>
					<li>
						<ul>
							<li>Lorem ipsum dolor sit amet.</li>
							<li>Consectetur adipisicing elit.</li>
							<li>Aspernatur eum explicabo facere fugiat ipsam libero.</li>
							<li>Minima necessitatibus saepe sapiente voluptatibus.</li>
						</ul>
					</li>
					<li>
						<ol>
							<li>Lorem ipsum dolor sit amet.</li>
							<li>Consectetur adipisicing elit.</li>
							<li>Aspernatur eum explicabo facere fugiat ipsam libero.</li>
							<li>Minima necessitatibus saepe sapiente voluptatibus.</li>
						</ol>
					</li>
				</ul>
				<ol>
					<li>Lorem ipsum dolor sit amet.</li>
					<li>Consectetur adipisicing elit.</li>
					<li>Aspernatur eum explicabo facere fugiat ipsam libero.</li>
					<li>Minima necessitatibus saepe sapiente voluptatibus.</li>
					<li>
						<ol>
							<li>Lorem ipsum dolor sit amet.</li>
							<li>Consectetur adipisicing elit.</li>
							<li>Aspernatur eum explicabo facere fugiat ipsam libero.</li>
							<li>Minima necessitatibus saepe sapiente voluptatibus.</li>
						</ol>
					</li>
					<li>
						<ul>
							<li>Lorem ipsum dolor sit amet.</li>
							<li>Consectetur adipisicing elit.</li>
							<li>Aspernatur eum explicabo facere fugiat ipsam libero.</li>
							<li>Minima necessitatibus saepe sapiente voluptatibus.</li>
						</ul>
					</li>
				</ol>
				<section>
					<h3>Data list</h3>
					<dl>
						<dt>Lorem ipsum</dt>
						<dd>Dolor sit amet.</dd>
						<dt>Lorem ipsum</dt>
						<dd>Dolor sit amet.</dd>
						<dd>Dolor sit amet.</dd>
						<dt>Lorem ipsum</dt>
						<dt>Lorem ipsum</dt>
						<dt>Lorem ipsum</dt>
						<dd>Dolor sit amet.</dd>
					</dl>
				</section>
			</section>
			<section>
				<h2>Advanced text formatting</h2>
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
					show keys or computer output: <kbd>Alt</kbd> + <kbd>F4</kbd>
				</p>
				<p>
					<abbr title="Hypertext Markup Language">HTML</abbr> is an abbreviation for Hypertext Markup
					Language.
				</p>
			</section>
			<section>
				<h2>Fieldset</h2>
				<fieldset>
					<legend>Your favorite anime</legend>
					<label>
						<input type="radio" name="anime" />
						Steins;Gate
					</label>
					<br />
					<label>
						<input type="radio" name="anime" />
						Way of the House Husband
					</label>
					<br />
					<label>
						<input type="radio" name="anime" />
						Gintama
					</label>
				</fieldset>
			</section>
		</div>
	);
}

export { Normalize };
