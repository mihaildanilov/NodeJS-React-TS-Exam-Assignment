import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckoutSteps } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { useCreateOrder } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageComponent } from '../layouts';

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
		<PageComponent title="Preview order">
			<div className="h-screen bg-gray-100 px-6 pt-16 sm:px-8 lg:px-12">
				<CheckoutSteps step1 step2 step3 step4 />
				<div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
					<div className="col-span-2 space-y-6">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-medium">Shipping</h2>
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

						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-medium">Payment</h2>
							<div className="space-y-1">
								<p>
									<strong>Method:</strong> {cart.paymentMethod}
								</p>
							</div>
							<Link to="/payment" className="text-sm text-blue-500 hover:underline">
								Edit
							</Link>
						</div>

						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-medium">Items</h2>
							<ul className="space-y-4">
								{cart.cartItems.map((item) => (
									<li key={item._id} className="flex space-x-4">
										<img
											src={item.imageSrc}
											alt={item.imageAlt}
											className="mb-4 w-full rounded-lg sm:mb-0 sm:w-40"
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

					<div className="h-[65%] space-y-4 rounded-lg bg-white p-6 shadow-md">
						<h2 className="mb-4 text-lg font-medium">Order Summary</h2>
						<ul className="divide-y divide-gray-200">
							<li className="flex items-center justify-between py-2">
								<span>Sub total</span>
								<span>${cart.itemsPrice.toFixed(2)}</span>
							</li>
							<li className="flex items-center justify-between py-2">
								<span>Shipping</span>
								<span>${cart.shippingPrice.toFixed(2)}</span>
							</li>
							<li className="flex items-center justify-between py-2">
								<span>Tax</span>
								<span>${cart.taxPrice.toFixed(2)}</span>
							</li>
							<li className="flex items-center justify-between py-2">
								<span>
									<strong>Order Total</strong>
								</span>
								<span>
									<strong>${cart.totalPrice.toFixed(2)}</strong>
								</span>
							</li>
							<li className="py-2">
								<div className="flex justify-center">
									<button
										type="button"
										onClick={placeOrderHandler}
										className="rounded-md bg-indigo-500 px-4 py-2 text-white disabled:opacity-50">
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
