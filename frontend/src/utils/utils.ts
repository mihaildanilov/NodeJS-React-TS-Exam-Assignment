import { ApiError } from '../types/ApiError';
import { CartItem } from '../types/Cart';
import { ProductListItemProps } from '../types/ProductList';

export const getError = (error: ApiError) => {
	return error.response && error.response.data.message
		? error.response.data.message
		: error.message;
};

export const convertProductToCartItem = (product: ProductListItemProps): CartItem => {
	const cartItem: CartItem = {
		_id: product._id,
		name: product.name,
		slug: product.slug,
		imageSrc: product.imageSrc,
		imageAlt: product.imageAlt,
		price: product.price,
		countInStock: product.countInStock,
		quantity: 1,
	};
	return cartItem;
};

export const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});
