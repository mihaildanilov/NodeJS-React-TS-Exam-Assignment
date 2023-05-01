import { useCallback } from 'react';
import apiClient from '../api/apiClient';
import { CartItem, ShippingAddress } from '../types/Cart';
import { Order } from '../types/Order';
import { useQuery } from '@tanstack/react-query';

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
