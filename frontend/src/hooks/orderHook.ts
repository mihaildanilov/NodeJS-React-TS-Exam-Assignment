import { useQuery, useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import apiClient from '../api/apiClient';
import { Order, CartItem, ShippingAddress } from '../types';

export const useGetOrderDetailsQuery = (id: string) =>
	useQuery({
		queryKey: ['orders', id],
		queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
	});

export const useCreateOrder = () => {
	const createOrder = useCallback(
		async (order: {
			orderItems: CartItem[];
			shippingAddress: ShippingAddress;
			paymentMethod: string;
			itemsPrice: number;
			shippingPrice: number;
			taxPrice: number;
			totalPrice: number;
		}) => {
			const response = await apiClient.post<{ message: string; order: Order }>(
				'api/orders',
				order
			);
			return response.data;
		},
		[]
	);

	return createOrder;
};

export const useGetPaypalClientIdQuery = () =>
	useQuery({
		queryKey: ['paypal-clientId'],
		queryFn: async () => (await apiClient.get<{ clientId: string }>('/api/keys/paypal')).data,
	});

export const usePayOrderMutation = () =>
	useMutation({
		mutationFn: async (details: { orderId: string }) =>
			(
				await apiClient.put<{ message: string; order: Order }>(
					`api/orders/${details.orderId}/pay`,
					details
				)
			).data,
	});

export const useGetOrderHistoryQuery = () =>
	useQuery({
		queryKey: ['order-history'],
		queryFn: async () => (await apiClient.get<Order[]>('/api/orders/mine')).data,
	});
export const useGetAllOrdersQuery = () =>
	useQuery({
		queryKey: ['all-orders'],
		queryFn: async () => (await apiClient.get<Order[]>('/api/orders/')).data,
	});

interface DeliverOrderMutationDetails {
	orderId: string;
}
export const useDeliverOrderMutation = () =>
	useMutation<Order, Error, DeliverOrderMutationDetails>(async (details) => {
		const { data } = await apiClient.put<{ message: string; order: Order }>(
			`/api/orders/${details.orderId}/deliver`,
			{}
		);
		return data.order;
	});
