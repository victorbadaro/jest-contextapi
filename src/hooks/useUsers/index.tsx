import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';

export function useUsers() {
	const context = useContext(UsersContext);

	return context;
}
