import apiClient from '../api/apiClient';
import { ProductListItemProps } from '../types/ProductList';
import { useQuery } from '@tanstack/react-query';

export const useGetProductQuery = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () => (await apiClient.get<ProductListItemProps[]>('api/products')).data,
	});
};
