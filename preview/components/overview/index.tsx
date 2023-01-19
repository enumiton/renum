import { COMPONENTS, ROUTES } from '../../index';
import { Link } from 'react-even-better-router-dom';
import { Example } from '../example';
import { capitalize } from '../../utils';

function Overview() {
	return (
		<div>
			<h1>Overview</h1>
			<ul>
				{ COMPONENTS.map(function (component) {
					return (
						<li key={ component }>
							<p>
								<Link href={ ROUTES.url(Example, { component }) }>
									{ capitalize(component) }
								</Link>
							</p>
						</li>
					);
				}) }
			</ul>
		</div>
	);
}

export { Overview };
