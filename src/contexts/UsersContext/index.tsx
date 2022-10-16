import { createContext, useState } from 'react';
import { IUsersContext, User, UsersProviderProps } from './types';

const UsersContext = createContext<IUsersContext>({} as IUsersContext);

function UsersProvider({ children }: UsersProviderProps) {
	const [users, setUsers] = useState<User[]>([]);

	function addUser(user: User) {
		setUsers([ ...users, user ]);
	}

	function removeUser(id: string) {
		const filteredUsers = users.filter(user => user.id !== id);

		setUsers(filteredUsers);
	}

	return (
		<UsersContext.Provider value={{ users, addUser, removeUser }}>
			{children}
		</UsersContext.Provider>
	);
}

export { UsersContext, UsersProvider };
