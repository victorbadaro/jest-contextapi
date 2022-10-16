import { render } from '@testing-library/react';
import { App } from './App';
import { UsersProvider } from './contexts/UsersContext';

describe('<App />', () => {
	it('Should render it', () => {
		const { container } = render(
			<UsersProvider>
				<App />
			</UsersProvider>
		);

		expect(container).toBeInTheDocument();
	});
});
