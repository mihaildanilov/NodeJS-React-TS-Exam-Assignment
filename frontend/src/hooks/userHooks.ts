import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { UserInfo } from '../types/UserInfo';

export const useSignInMutation = () =>
	//!Solve this issue
	useMutation<UserInfo, Error, { email: string; password: string }>(
		async ({ email, password }) => {
			const { data } = await apiClient.post<UserInfo>(
				'http://localhost:4000/api/users/signin',
				{ email, password }
			);
			return data;
		}
	);
