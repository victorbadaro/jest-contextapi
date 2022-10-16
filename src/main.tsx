import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './contexts/UsersContext';

const container = document.getElementById('root');

createRoot(container as HTMLElement).render(
	<UsersProvider>
		<App />
	</UsersProvider>
);
