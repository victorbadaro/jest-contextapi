import { ReactNode } from 'react';

export interface User {
	id: string;
	name: string;
}

export interface UsersProviderProps {
	children: ReactNode;
}

export interface IUsersContext {
	users: User[];
	addUser: (user: User) => void;
	removeUser: (id: string) => void;
}
