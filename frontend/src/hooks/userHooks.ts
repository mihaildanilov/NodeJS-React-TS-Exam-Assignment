import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';
import { UserInfo } from '../types';

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

export const useGetAllUsersQuery = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: async () => (await apiClient.get<UserInfo[]>('api/users')).data,
	});
};

export const deleteUser = async (id: string) => {
	try {
		const response = await apiClient.delete(`api/users/${id}`);
		if (response.status === 200) {
			toast.success('User deleted successfully');
		} else if (response.status === 404) {
			toast.error('User not found');
		} else {
			toast.error('Internal server error');
		}
	} catch (error) {
		toast.error('Error occurred');
	}
};
export const editUser = async (id: string) => {
	try {
		const response = await apiClient.put(`api/users/${id}`);
		if (response.status === 200) {
			toast.success('User edited successfully');
		} else if (response.status === 404) {
			toast.error('User not found');
		} else {
			toast.error('Internal server error');
		}
	} catch (error) {
		toast.error('Error occurred');
	}
};

export const useGetUserDetailsById = (id: string) =>
	useQuery({
		queryKey: ['user', id],
		queryFn: async () => (await apiClient.get<UserInfo>(`api/users/${id}`)).data,
	});

interface userNewData {
	name: string;
	email: string;
	password: string;
	subscribedToNewsletter?: boolean;
}

export const useUpdateProfileMutation = () =>
	useMutation<UserInfo, unknown, userNewData, unknown>(
		async ({ name, email, password, subscribedToNewsletter }) =>
			(
				await apiClient.put<UserInfo>('api/users/profile', {
					name,
					email,
					password,
					subscribedToNewsletter,
				})
			).data
	);
export const useUpdateUserMutation = (id: string) =>
	useMutation<UserInfo, unknown, userNewData, unknown>(
		async ({ name, email, password, subscribedToNewsletter }) =>
			(
				await apiClient.put<UserInfo>(`api/users/${id}`, {
					name,
					email,
					password,
					subscribedToNewsletter,
				})
			).data
	);
