import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageComponent from '../components/PageComponent';
import { useStateContext } from '../context/ContextProvider';
import { useCreateOrder } from '../hooks/orderHook';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils/utils';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderPage = () => {
	const navigate = useNavigate();

	const { state, dispatch } = useStateContext();
	const { cart } = state;

	const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23

	cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
	cart.taxPrice = round2(0.21 * cart.itemsPrice);
	cart.itemsPrice = cart.itemsPrice - cart.taxPrice;
	if (cart.itemsPrice > 0) {
		cart.shippingPrice = 20.99;
	} else {
		cart.shippingPrice = 0;
	}
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const createOrder = useCreateOrder();
	const placeOrderHandler = async () => {
		try {
			const data = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			});
			dispatch({ type: 'CART_CLEAR' });
			localStorage.removeItem('cartItems');
			navigate(`/order/${data.order._id}`);
		} catch (err) {
			toast.error(getError(err as ApiError));
		}
	};

	useEffect(() => {
		if (!cart.paymentMethod) {
			navigate('/payment');
		}
	}, [cart, navigate]);
	return (
		<PageComponent title="Pr order">
			<div className="h-screen bg-gray-100 px-6 pt-16 sm:px-8 lg:px-12">
				<CheckoutSteps step1 step2 step3 step4 />
				<div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="col-span-2 space-y-6">
						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-medium mb-4">Shipping</h2>
							<div className="space-y-1">
								<p>
									<strong>Name:</strong> {cart.shippingAddress.fullName}
								</p>
								<p>
									<strong>Address:</strong> {cart.shippingAddress.address},{' '}
									{cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
									{cart.shippingAddress.country}
								</p>
							</div>
							<Link to="/shipping" className="text-sm text-blue-500 hover:underline">
								Edit
							</Link>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-medium mb-4">Payment</h2>
							<div className="space-y-1">
								<p>
									<strong>Method:</strong> {cart.paymentMethod}
								</p>
							</div>
							<Link to="/payment" className="text-sm text-blue-500 hover:underline">
								Edit
							</Link>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-medium mb-4">Items</h2>
							<ul className="space-y-4">
								{cart.cartItems.map((item) => (
									<li key={item._id} className="flex space-x-4">
										<img
											src={item.imageSrc}
											alt={item.imageAlt}
											className="w-full sm:w-40 rounded-lg mb-4 sm:mb-0"
										/>
										<div className="flex-1">
											<h3 className="text-lg font-medium text-gray-900">
												{item.name}
											</h3>
											<div className="flex items-center space-x-3 text-sm text-gray-500">
												<p>Quantity: {item.quantity}</p>
												<p>Price: ${item.price}</p>
												<p>Total price: ${item.price * item.quantity}</p>
											</div>
										</div>
									</li>
								))}
							</ul>
							<Link to="/cart" className="text-sm text-blue-500 hover:underline">
								Edit
							</Link>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 space-y-4">
						<h2 className="text-lg font-medium mb-4">Order Summary</h2>
						<ul className="divide-y divide-gray-200">
							<li className="py-2 flex justify-between items-center">
								<span>Sub total</span>
								<span>${cart.itemsPrice.toFixed(2)}</span>
							</li>
							<li className="py-2 flex justify-between items-center">
								<span>Shipping</span>
								<span>${cart.shippingPrice.toFixed(2)}</span>
							</li>
							<li className="py-2 flex justify-between items-center">
								<span>
									<strong>Order Total</strong>
								</span>
								<span>
									<strong>${cart.totalPrice.toFixed(2)}</strong>
								</span>
							</li>
							<li className="py-2 flex justify-between items-center">
								<span>Tax</span>
								<span>${cart.taxPrice.toFixed(2)}</span>
							</li>
							<li className="py-2">
								<div className="flex justify-center">
									<button
										type="button"
										onClick={placeOrderHandler}
										className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50">
										Place Order
									</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default PlaceOrderPage;
