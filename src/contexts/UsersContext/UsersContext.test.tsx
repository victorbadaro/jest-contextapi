import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormEvent, useContext, useState } from 'react';
import { UsersContext, UsersProvider } from '.';
import { User } from './types';

function TestingComponent() {
	const { users, addUser, removeUser } = useContext(UsersContext);
	const [user, setUser] = useState('');

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const newUser: User = {
			id: crypto.randomUUID(),
			name: user
		};

		addUser(newUser);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={event => setUser(event.target.value)}
					value={user}
				/>

				<button type="submit">save</button>
			</form>

			<ul data-testid="users-list">
				{users.map(user => (
					<li key={user.id}>
						<span>{user.name}</span>
						<button
							type="button"
							onClick={() => removeUser(user.id)}
						>
							remove
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

describe('<UsersContext />', () => {

	it('Should add a new user after calling the addUser function', async () => {
		const user = userEvent.setup();
		const { container } = render(
			<UsersProvider>
				<TestingComponent />
			</UsersProvider>
		);
		const form = container.querySelector('form') as HTMLFormElement;
		const input = form.querySelector('input') as HTMLInputElement;
		const submitButton = form.querySelector('button') as HTMLButtonElement;
		const usersList = screen.getByTestId('users-list');

		expect(usersList).not.toContainElement(usersList.querySelector('li'));

		await user.type(input, 'user test');
		await user.click(submitButton);

		expect(usersList).toContainElement(usersList.querySelector('li'));
	});

	it.skip('Should remove a specific user after calling removeUser function', () => {
		const { debug } = render(
			<UsersProvider>
				<TestingComponent />
			</UsersProvider>
		);

		debug();
	});
});
