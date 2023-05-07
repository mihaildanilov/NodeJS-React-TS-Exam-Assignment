import { useState } from 'react';
import { Order } from '../../types';
import { NavLink } from 'react-router-dom';
import { ModalDeliverPackage } from '../modals';

interface OrderTableProps {
	ordersToDisplay: Order[] | undefined;
	tableName: string;
}
const OrderTable = (props: OrderTableProps) => {
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
	let totalOrderCount = 0;
	if (props.ordersToDisplay !== undefined) {
		totalOrderCount = props.ordersToDisplay?.length;
	}
	const [showMore, setShowMore] = useState(false);

	const orders = props.ordersToDisplay?.map((order, index) => {
		return (
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

				<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
					<span
						className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium ${
							order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
						}`}>
						{order.isPaid ? 'Paid' : 'Not paid'}
					</span>
				</td>

				{order.isDelivered ? (
					<td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
						<span
							className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium ${
								order.isDelivered ? 'bg-green-100 text-green-800' : null
							}`}>
							Delivered
						</span>
					</td>
				) : (
					<td className=" py-4 whitespace-no-wrap border-b text-sm leading-5">
						<ModalDeliverPackage itemName={order._id} />
					</td>
				)}

				<td className="px-6 py-4 whitespace-no-wrap border-b  text-sm leading-5 text-gray-500">
					<NavLink to={`/order/${order._id}`}>Details</NavLink>
				</td>
				<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
					<NavLink to={`/invoice/${order._id}`}>Invoice</NavLink>
				</td>
			</tr>
		);
	});
	return (
		<div>
			<div className="flex flex-col mt-8">
				<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
						<table className="min-w-full">
							<caption className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								{props.tableName}
							</caption>
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
								{showMore ? orders : orders?.slice(0, 5)}
							</tbody>
						</table>
					</div>
					{}
					{totalOrderCount > 5 ? (
						<button
							className={`mt-3 p-2 rounded-md bg-blue-600 py-1.5 font-medium text-blue-50 hover:bg-blue-500 '
						}`}
							onClick={() => setShowMore(!showMore)}>
							{showMore ? 'Show less' : 'Show more'}
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default OrderTable;
