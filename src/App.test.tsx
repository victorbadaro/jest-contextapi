import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProviderProps, ReactNode } from 'react';
import { App } from './App';
import { UsersContext, UsersProvider } from './contexts/UsersContext';
import { IUsersContext } from './contexts/UsersContext/types';

function customRender(ui: ReactNode, providerProps: ProviderProps<IUsersContext>) {
	return render(<UsersContext.Provider {...providerProps}>{ui}</UsersContext.Provider>);
}

describe('<App />', () => {
	it('Should be able to render without crashing', () => {
		const { container } = render(
			<UsersProvider>
				<App />
			</UsersProvider>
		);

		expect(container).toBeInTheDocument();
	});

	it('Should be able to call the addUser function after submitting the form properly', async () => {
		const providerProps: ProviderProps<IUsersContext> = {
			value: {
				users: [],
				addUser: jest.fn(),
				removeUser: jest.fn(),
			}
		};
		const user = userEvent.setup();
		const { container } = customRender(<App />, providerProps);

		const form = container.querySelector('form') as HTMLFormElement;
		const input = form.querySelector('input') as HTMLInputElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;

		await user.type(input, 'user test');
		await user.click(submitButton);

		expect(providerProps.value.addUser).toHaveBeenCalledTimes(1);
	});
});
