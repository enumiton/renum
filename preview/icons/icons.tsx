import { lazy, Suspense, useState } from 'react';
import { Button } from '../../src/components/button';
import { Loading } from '../../src/components/loading';
import styles from './icons.module.less';

const modules = import.meta.glob('../src/icons/*.tsx');

const imports = Object.keys(modules).map(function (path) {
	return path.split('/').pop()!.split('.').shift()!;
});

function Icons() {
	const [max, setMax] = useState(15);

	return (
		<div>
			<header>

			</header>
			<div className={ styles.list }>
				{ imports.slice(0, max).map(function (key, i) {
					const Component = lazy(() => import('../src/icons/' + key + '.tsx'));

					return (
						<div key={ i } className={ styles.icon }>
							<Suspense fallback={ <Loading active /> }>
								<Component />
							</Suspense>
							<span>{ key }</span>
						</div>
					);
				}) }
			</div>
			<div>
				<Button block onClick={ () => setMax((v) => v + 15) }>More</Button>
			</div>
		</div>
	);
}

export default Icons;
