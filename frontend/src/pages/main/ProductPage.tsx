import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '../../components';
import { LoadingBox, MessageBoxError, StatusToast } from '../../components/toasts';
import { useStateContext } from '../../context/ContextProvider';
import { useGetProductDetailsBySlugQuery } from '../../hooks/productHook';
import { CartItem, ApiError } from '../../types';
import { getError, convertProductToCartItem } from '../../utils';
import { PageComponent } from '../layouts';
import PageNotFound from './PageNotFound';
import { ModalOutOfStock } from '../../components/modals';

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
					<div className="max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
						<img
							src={product.imageSrc}
							alt={product.imageAlt}
							className="h-full w-full object-cover object-center"
						/>
						<div className="mx-[100px] mt-4 lg:row-span-3 lg:mt-0">
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
							<form>
								{product.countInStock > 0 ? (
									<>
										<StatusToast message="In stock" />
										<button
											type="button"
											onClick={() => {
												addToCartHandler(convertProductToCartItem(product));
											}}
											className="mt-4 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white   transition-all hover:bg-blue-600 ">
											Add to cart
											<svg
												className="h-3.5 w-3.5"
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
									<StatusToast message="Out of stock" />
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
