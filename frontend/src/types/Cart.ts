export interface CartItem {
	_id: string;
	name: string;
	slug: string;
	imageSrc: string | undefined;
	imageAlt: string | undefined;
	price: number;
	countInStock: number;
	quantity: number;
}

export interface ShippingAdress {
	fullName: string;
	address: string;
	city: string;
	country: string;
	postalCode: string;
}

export interface Cart {
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	cartItems: CartItem[];
	shippingAddress: ShippingAdress;
	paymentMethod: string;
}
