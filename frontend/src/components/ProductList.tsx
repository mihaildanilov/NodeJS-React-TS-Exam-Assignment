import { useGetProductQuery } from '../hooks';
import { ApiError } from '../types';
import { getError } from '../utils';
import ProductListItem from './ProductListItem';
import { LoadingBox, MessageBoxError } from './toasts';

const ProductList = () => {
	const { data: products, isLoading, error } = useGetProductQuery();
	return isLoading ? (
		<LoadingBox text="Action in progress" />
	) : error ? (
		<MessageBoxError message={getError(error as ApiError)} />
	) : (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:p-6 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Our products</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products?.map((item, index) => {
						return <ProductListItem key={index} index={index} item={item} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
