import { lazy, Suspense } from "react";
import { Loading } from "../../src/components/loading";

const Component = lazy(() => import('./icons'));

function Icons() {
	return (
		<Suspense fallback={ <Loading /> }>
			<Component />
		</Suspense>
	);
}

export { Icons };
