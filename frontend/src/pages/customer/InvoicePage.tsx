import { useParams, NavLink } from 'react-router-dom';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetOrderDetailsQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageComponent } from '../layouts';

const InvoicePage = () => {
	// const navigate = useNavigate();
	const params = useParams();
	const { id: orderId } = params;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		};
		return date.toLocaleDateString('en-US', options);
	};

	return isLoading ? (
		<LoadingBox text="Loading" />
	) : error ? (
		<MessageBoxError message={getError(error as unknown as ApiError)} />
	) : !order ? (
		<MessageBoxError message="Invoice Not Found" />
	) : (
		<PageComponent title="Invoice">
			<div
				key={order._id}
				className="mx-auto border border-gray-200 bg-white px-6 py-8 shadow-md">
				<div className="flex justify-between">
					<div className="flex-1">
						<NavLink className="text-blue-600   " to="/profile">
							<div>
								<button className="underline-offset-4 hover:underline">
									&larr; Back to profile
								</button>
							</div>
						</NavLink>
						<h1 className="mb-2 mt-8 text-xl font-bold">Invoice #{order._id}</h1>
						<p className="text-gray-600">{formatDate(order.paidAt)}</p>
					</div>
					<div className="mr-3 text-right">
						<img
							className="h-8 w-8"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt="Kicks Avenue"
						/>
					</div>
				</div>

				<div className="mt-6">
					<table className="w-full border-collapse">
						<thead className="border-b border-gray-400">
							<tr>
								<th className="border-gray-400 py-2 text-left font-normal  text-gray-600">
									Item
								</th>
								<th className="border-gray-400 py-2 text-left font-normal  text-gray-600">
									Quantity
								</th>
								<th className="border-gray-400 py-2 text-left font-normal  text-gray-600">
									Price per Unit
								</th>
								<th className="border-gray-400 py-2 text-left font-normal  text-gray-600">
									Subtotal (excl. tax)
								</th>
								<th className="border-gray-400 py-2 text-left font-normal  text-gray-600">
									Tax
								</th>
								<th className="py-2 text-left font-normal text-gray-600">
									Total (incl. tax)
								</th>
							</tr>
						</thead>
						<tbody>
							{order.orderItems.map((item, index) => (
								<tr key={index}>
									<td className="border-gray-400 py-4 text-left  text-gray-800">
										{item.name}
									</td>
									<td className="border-gray-400 py-4 text-left  text-gray-800">
										{item.quantity}
									</td>
									<td className="border-gray-400 py-4 text-left  text-gray-800">
										${item.price}
									</td>
									<td className="py-4 text-left text-gray-800">
										$
										{(
											item.quantity * item.price -
											item.quantity * item.price * 0.21
										).toFixed(2)}
									</td>
									<td className="py-4 text-left text-gray-800">
										${(item.quantity * item.price * 0.21).toFixed(2)}
									</td>
									<td className="py-4 text-left text-gray-800">
										${(item.quantity * item.price).toFixed(2)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-6 flex justify-end">
					<ul className="text-right">
						<li className="flex w-[15rem] items-center justify-between py-2">
							<span className="pr-5">Sub total:</span>
							<span>${order.itemsPrice.toFixed(2)}</span>
						</li>
						<li className="flex items-center justify-between py-2">
							<span>Shipping:</span>
							<span>${order.shippingPrice.toFixed(2)}</span>
						</li>
						<li className="flex items-center justify-between py-2">
							<span>Tax:</span>
							<span>${order.taxPrice.toFixed(2)}</span>
						</li>
						<li className="flex items-center justify-between py-2">
							<span>
								<strong>Order Total:</strong>
							</span>
							<span>
								<strong>${order.totalPrice.toFixed(2)}</strong>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</PageComponent>
	);
};

export default InvoicePage;
