import { createRoot } from 'react-dom/client';
import { Providers } from './app';

const el = document.querySelector('#app');

if (!el) {
	throw new Error('Could not find app root');
}

createRoot(el).render(<Providers />);
