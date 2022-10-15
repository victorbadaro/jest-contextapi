import { render } from '@testing-library/react';
import { App } from './App';

describe('<App />', () => {
	it('Should render it', () => {
		const { container } = render(<App />);

		expect(container).toBeInTheDocument();
	});
});
