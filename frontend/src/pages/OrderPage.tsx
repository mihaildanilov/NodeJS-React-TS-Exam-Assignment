import { useParams } from 'react-router-dom';
import PageComponent from '../components/PageComponent';
import { useGetOrderDetailsQuery } from '../hooks/orderHook';
import LoadingBox from '../components/LoadingBox';
import { MessageBoxError, MessageBoxSuccess, MessageBoxWarning } from '../components/MessageBox';
import { getError } from '../utils/utils';
import { ApiError } from '../types/ApiError';

const OrderPage = () => {
	const params = useParams();
	const { id: orderId } = params;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

	return isLoading ? (
		<LoadingBox text="Loading"></LoadingBox>
	) : error ? (
		<MessageBoxError message={getError(error as unknown as ApiError)} />
	) : !order ? (
		<MessageBoxError message="Order Not Found" />
	) : (
		<PageComponent title={`Order ${orderId}`}>
			<div className="h-screen bg-gray-100 px-6 pt-16 sm:px-8 lg:px-12">
				<div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="col-span-2 space-y-6">
						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-medium mb-4">Shipping</h2>
							<div className="space-y-1">
								<p>
									<strong>Name:</strong> {order.shippingAddress.fullName}
								</p>
								<p>
									<strong>Address:</strong> {order.shippingAddress.address},{' '}
									{order.shippingAddress.city}, {order.shippingAddress.postalCode}
									, {order.shippingAddress.country}
								</p>
							</div>
							{order.isPaid ? (
								<MessageBoxSuccess
									message={`Paid at ${order.deliveredAt}`}></MessageBoxSuccess>
							) : (
								<MessageBoxWarning message="Not Delivered"></MessageBoxWarning>
							)}
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-medium mb-4">Payment</h2>
							<div className="space-y-1">
								<p>
									<strong>Method:</strong> {order.paymentMethod}
								</p>
							</div>
							{order.isPaid ? (
								<MessageBoxSuccess
									message={`Paid at ${order.paidAt}`}></MessageBoxSuccess>
							) : (
								<MessageBoxWarning message="Not Paid"></MessageBoxWarning>
							)}
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-medium mb-4">Items</h2>
							<ul className="space-y-4">
								{order.orderItems.map((item) => (
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
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 space-y-4 h-[42%]">
						<h2 className="text-lg font-medium mb-4">Order Summary</h2>
						<ul className="divide-y divide-gray-200">
							<li className="py-2 flex justify-between items-center">
								<span>Sub total</span>
								<span>${order.itemsPrice.toFixed(2)}</span>
							</li>
							<li className="py-2 flex justify-between items-center">
								<span>Shipping</span>
								<span>${order.shippingPrice.toFixed(2)}</span>
							</li>
							<li className="py-2 flex justify-between items-center">
								<span>Tax</span>
								<span>${order.taxPrice.toFixed(2)}</span>
							</li>
							<li className="py-2 flex justify-between items-center">
								<span>
									<strong>Order Total</strong>
								</span>
								<span>
									<strong>${order.totalPrice.toFixed(2)}</strong>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default OrderPage;
