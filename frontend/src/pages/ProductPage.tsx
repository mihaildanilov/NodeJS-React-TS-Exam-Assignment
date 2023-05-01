import { useParams } from 'react-router-dom';
import PageComponent from '../components/PageComponent';
import { MessageBoxError } from '../components/MessageBox';
import { ApiError } from '../types/ApiError';
import { convertProductToCartItem, getError } from '../utils/utils';
import LoadingBox from '../components/LoadingBox';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHook';
import PageNotFound from './PageNotFound';

import Rating from '../components/Rating';
import StatusToast from '../components/StatusToast';
import { useStateContext } from '../context/ContextProvider';
import { CartItem } from '../types/Cart';
import { useState } from 'react';
import ModalOutOfStock from '../components/ModalOutOfStock';

const ProductPage = () => {
	const { state, dispatch } = useStateContext();
	const {
		cart: { cartItems },
	} = state;
	const { slug } = useParams<{ slug: string }>();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);
	const [isOutOfStock, setIsOutOfStock] = useState(false);

	const addToCartHandler = (item: CartItem) => {
		const existItem = cartItems.find((x) => x._id === item._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		if (item.countInStock < quantity) {
			setIsOutOfStock(true);
			return;
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		});
	};

	return isLoading ? (
		<LoadingBox text="Action in progress" />
	) : error ? (
		<MessageBoxError message={getError(error as ApiError)} />
	) : !product ? (
		<PageNotFound />
	) : (
		<PageComponent title="Product page">
			<div className="bg-white">
				<div className="pt-6">
					{/* Product Image */}
					<div className="max-w-2xl  lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
						<img
							src={product.imageSrc}
							alt={product.imageAlt}
							className="h-full w-full object-cover object-center"
						/>
						<div className="mt-4 lg:row-span-3 lg:mt-0 mx-[100px]">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl  text-gray-900">Price: {product.price}$</p>
							{/* Reviews */}
							<div className="mt-6">
								<h3 className="sr-only">Reviews</h3>
								<div className="flex items-center">
									<div className="flex items-center">
										<Rating rating={product.rating} />
									</div>

									<p className="ml-3 text-sm font-medium text-indigo-600">
										{product.numberOfReviews} reviews
									</p>
								</div>
							</div>
							<form className="pt-">
								{product.countInStock > 0 ? (
									<>
										<StatusToast message="In stock" />
										<button
											type="button"
											onClick={() => {
												addToCartHandler(convertProductToCartItem(product));
											}}
											className="py-3 mt-4 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600   transition-all text-sm ">
											Add to cart
											<svg
												className="w-3.5 h-3.5"
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16">
												<path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
											</svg>
										</button>
										<ModalOutOfStock
											isOpen={isOutOfStock}
											onClose={() => setIsOutOfStock(false)}
											itemName={product.name}
										/>
									</>
								) : (
									<StatusToast message="Out stock" />
								)}
							</form>
						</div>
					</div>
					{/* Product info */}
					<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
						<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
							<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								{product.name}
							</h1>
						</div>
						<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
							{/* Description and details */}
							<div>
								<h3 className="sr-only">Description</h3>

								<div className="space-y-6">
									<p className="text-base text-gray-900">{product.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default ProductPage;
