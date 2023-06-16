import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';
import { ProductListItemProps } from '../types';
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

export const deleteProduct = async (slug: string) => {
	try {
		const response = await apiClient.delete(`/api/products/slug/${slug}`);
		if (response.status === 200) {
			toast.success('Product deleted successfully');
		} else if (response.status === 404) {
			toast.error('Product not found');
		} else {
			toast.error('Internal server error');
		}
	} catch (error) {
		toast.error('Error occurred');
	}
};
