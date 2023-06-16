import { useState } from 'react';
import { Order } from '../../types';
import { NavLink } from 'react-router-dom';

import { formatDate } from '../../utils';
import ModalWarning from '../modals/ModalWarning';

interface OrderTableProps {
	ordersToDisplay: Order[] | undefined;
	tableName: string;
	ModalDeliver: (action: string) => void;
	ModalDelete: (action: string) => void;
}
const OrderTable = (props: OrderTableProps) => {
	let totalOrderCount = 0;
	if (props.ordersToDisplay !== undefined) {
		totalOrderCount = props.ordersToDisplay?.length;
	}

	const [showMore, setShowMore] = useState(false);

	const orders = props.ordersToDisplay
		?.slice()
		.reverse()
		.map((order, index) => {
			return (
				<tr key={index}>
					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="flex items-center">
							<div className="ml-4">
								<div className="text-sm font-medium leading-5 text-gray-500">
									{order._id}
								</div>
							</div>
						</div>
					</td>

					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="text-sm leading-5 text-gray-500">
							{formatDate(order.createdAt)}
						</div>
					</td>

					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="text-sm leading-5 text-gray-500">
							{order.totalPrice.toFixed(2)} $
						</div>
					</td>

					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm leading-5">
						<span
							className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium ${
								order.isPaid
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							}`}>
							{order.isPaid ? 'Paid' : 'Not paid'}
						</span>
					</td>

					{order.isDelivered ? (
						<td className="whitespace-nowrap border-b border-gray-200 p-4 text-sm leading-5">
							<span
								className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium ${
									order.isDelivered ? 'bg-green-100 text-green-800' : null
								}`}>
								Delivered
							</span>
						</td>
					) : (
						<td className=" whitespace-nowrap border-b py-4 text-sm leading-5">
							<ModalWarning
								title="Package delivery"
								buttontext="Deliver package"
								warningtext="Are you sure you want to deliver package: "
								successMessage="Package Successfully delivered!"
								proceedaction={props.ModalDeliver}
								itemname={order._id}
							/>
						</td>
					)}
					<td className=" whitespace-nowrap border-b py-4 text-sm leading-5">
						<ModalWarning
							title="Delete order"
							buttontext="Delete order"
							warningtext="Are you sure you want to delete this order: "
							successMessage="Order successfully deleted!"
							proceedaction={props.ModalDelete}
							itemname={order._id}
						/>
					</td>
					<td className="whitespace-nowrap border-b px-6 py-4  text-sm leading-5 text-gray-500">
						<NavLink to={`/order/${order._id}`}>Details</NavLink>
					</td>
					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm leading-5 text-gray-500">
						<NavLink to={`/invoice/${order._id}`}>Invoice</NavLink>
					</td>
				</tr>
			);
		});
	return (
		<div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
						<table className="min-w-full">
							<caption className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
								{props.tableName}
							</caption>
							<thead>
								<tr>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Order ID
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Date
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Price
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Payment
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Delivery
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Delete
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Details
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
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
							className={`mt-3 rounded-md bg-blue-600 p-2 py-1.5 font-medium text-blue-50 hover:bg-blue-500 
						`}
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
