/// <reference types="vite/client" />
import { lazy, Suspense, useState } from 'react';
import { Button, Loading } from '../../src';
import styles from './icons.module.less';
import Plus from '../../src/icons/Plus';

const modules = import.meta.glob('../../src/icons/*.tsx');

const imports = Object.keys(modules).map(function (path) {
	return path.split('/').pop()!.split('.').shift()!;
});

const PER_PAGE = 15;

function Icons() {
	const [max, setMax] = useState(PER_PAGE);

	return (
		<div>
			<div className={ styles.list }>
				{ imports.slice(0, max).map(function (key, i) {
					const Component = lazy(() => import('../../src/icons/' + key + '.tsx'));

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
				<Button
					block
					dashed
					icon={ <Plus /> }
					hidden={ max >= imports.length }
					onClick={ () => setMax((v) => v + PER_PAGE) }
				>
					More
				</Button>
			</div>
		</div>
	);
}

export default Icons;
