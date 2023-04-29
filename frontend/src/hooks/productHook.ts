import apiClient from '../api/apiClient';
import { ProductListItemProps } from '../types/ProductList';
import { useQuery } from '@tanstack/react-query';

export const useGetProductQuery = () =>
	useQuery({
		queryKey: ['products'],
		queryFn: async () => (await apiClient.get<ProductListItemProps[]>('api/products')).data,
	});

export const useGetProductDetailsBySlugQuery = (slug: string) =>
	useQuery({
		queryKey: ['products', slug],
		queryFn: async () =>
			(await apiClient.get<ProductListItemProps>(`api/products/slug/${slug}`)).data,
	});
