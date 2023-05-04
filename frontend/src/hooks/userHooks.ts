import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const signUp = async (name: string, email: string, password: string) => {
	const data = { name, email, password };
	const response = await apiClient.post('api/users/signup', data);
	return response.data;
};
export const signIn = async (email: string, password: string) => {
	const data = { email, password };
	const response = await apiClient.post('api/users/signin', data);
	return response.data;
};

interface User {
	_id?: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export const useGetAllUsersQuery = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: async () => (await apiClient.get<User[]>('api/users')).data,
	});
};
