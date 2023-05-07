import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetAllOrdersQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import OrderTable from '../../components/tables/OrderTable';

const OrderManagement = () => {
	const { data: orders, isLoading, error } = useGetAllOrdersQuery();
	const deliveredOrders = orders?.filter((order) => order.isDelivered === true);
	const undeliveredOrders = orders?.filter((order) => order.isDelivered === false);

	return (
		<div className="p-4 sm:ml-64">
			<div className="border-gray-200 p-4 bg-gray-50 border-b rounded-md">
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
				<>
					{undeliveredOrders?.length != 0 ? (
						<OrderTable
							tableName="Undelivered Orders"
							ordersToDisplay={undeliveredOrders}
						/>
					) : (
						<div className="border-gray-200 p-2 mt-3 bg-green-100 border-b rounded-md text-center">
							<h1 className="text-xl font-semibold text-green-600">
								All orders fullfiled! Congratulations!
							</h1>
						</div>
					)}

					<OrderTable tableName="Delivered Orders" ordersToDisplay={deliveredOrders} />
				</>
			)}
		</div>
	);
};

export default OrderManagement;
