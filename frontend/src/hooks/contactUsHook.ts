import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useQuery } from '@tanstack/react-query';

interface ContactUs {
	_id: string;
	user?: {
		_id: string;
		name: string;
		email: string;
	};
	subject: string;
	customersMessage: string;
	replyMessage?: string;
	createdAt: string;
	isAnswered: boolean;
	answeredAt?: string;
}

export const useContactUs = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const createContactUs = async (subject: string, customersMessage: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await apiClient.post<ContactUs>('api/contact-us', {
				subject,
				customersMessage,
			});
			setIsLoading(false);
			return response.data;
		} catch (error) {
			setIsLoading(false);
			setError('Something went wrong');
		}
	};

	return {
		isLoading,
		error,
		createContactUs,
	};
};
export const useGetAllContactUsMessages = () =>
	useQuery({
		queryKey: ['all-messages'],
		queryFn: async () =>
			(await apiClient.get<ContactUs[]>('/api/contact-us/all-messages')).data,
	});

export const useGetContactUsMessageByID = (id: string) =>
	useQuery({
		queryKey: ['messages', id],
		queryFn: async () => (await apiClient.get<ContactUs>(`/api/contact-us/message/${id}`)).data,
	});

export const useGetMessageHistoryQuery = () =>
	useQuery({
		queryKey: ['message-history'],
		queryFn: async () =>
			(await apiClient.get<ContactUs[]>('/api/contact-us/user-messages')).data,
	});
