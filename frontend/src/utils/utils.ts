import { ApiError, ProductListItemProps, CartItem } from '../types';

export const getError = (error: ApiError) =>
	error.response && error.response.data.message ? error.response.data.message : error.message;

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

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	};
	const formattedDate = date.toLocaleDateString('lv-LV', options);
	const formattedTime = date.toLocaleTimeString('lv-LV', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return `${formattedTime} on ${formattedDate}`;
};
