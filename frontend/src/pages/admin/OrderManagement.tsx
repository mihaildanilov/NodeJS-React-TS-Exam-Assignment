import { NavLink } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import { MessageBoxError } from '../../components/MessageBox';
import { useGetAllOrdersQuery } from '../../hooks/orderHook';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils/utils';

const OrderManagement = () => {
	const { data: orders, isLoading, error } = useGetAllOrdersQuery();
	const formatDate = (dateString: string): string => {
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
	return (
		<div className="p-4 sm:ml-64">
			<div className="border-gray-200 pt-3 p-4 bg-gray-50 border-b rounded-md">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					Product managment
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track the orders of your store, by handling delivery and payment status.
				</p>
			</div>

			{isLoading ? (
				<LoadingBox text="Action in progress" />
			) : error ? (
				<MessageBoxError message={getError(error as unknown as ApiError)} />
			) : (
				<div>
					<div className="flex flex-col mt-8">
						<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
								<table className="min-w-full">
									<thead>
										<tr>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Order ID
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Date
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Price
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Payment
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Delivery
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Details
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Invoice
											</th>
										</tr>
									</thead>

									<tbody className="bg-white">
										{orders
											?.slice()
											.reverse()
											.map((order, index) => (
												<tr key={index}>
													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<div className="flex items-center">
															<div className="ml-4">
																<div className="text-sm leading-5 font-medium text-gray-900">
																	{order._id}
																</div>
															</div>
														</div>
													</td>

													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<div className="text-sm leading-5 text-gray-900">
															{formatDate(order.createdAt)}
														</div>
													</td>

													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														{order.totalPrice.toFixed(2)} $
													</td>

													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
														{order.isPaid ? 'Paid' : 'Not paid'}
													</td>
													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
														{order.isDelivered
															? 'Delivered'
															: 'Not delivered'}
													</td>
													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
														<NavLink to={`/order/${order._id}`}>
															Details
														</NavLink>
													</td>
													<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
														<NavLink to={`/invoice/${order._id}`}>
															Invoice
														</NavLink>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderManagement;
