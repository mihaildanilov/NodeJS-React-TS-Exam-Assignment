import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useDeliverOrderMutation, useGetAllOrdersQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import OrderTable from '../../components/tables/OrderTable';
import { useOrderDeletion } from '../../hooks/orderHook';

const OrderManagement = () => {
	const { data: orders, isLoading, error } = useGetAllOrdersQuery();
	const deliveredOrders = orders?.filter((order) => order.isDelivered === true);
	const undeliveredOrders = orders?.filter((order) => order.isDelivered === false);

	const { mutate: deliverOrder } = useDeliverOrderMutation();

	const handleDeliverOrder = async (orderId: string) => {
		await deliverOrder({ orderId });
	};
	const { isLoading: isLoadingDelete, error: errorDelete, deleteOrder } = useOrderDeletion();
	const handleDelete = async (orderId: string) => {
		await deleteOrder(orderId);
	};

	return (
		<div>
			<div className="rounded-md border-b border-gray-200 bg-gray-50 p-4">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					Order managment
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track the orders of your store, by handling delivery and payment status.
				</p>
			</div>

			{isLoading && isLoadingDelete ? (
				<LoadingBox text="Action in progress" />
			) : error && errorDelete ? (
				<MessageBoxError message={getError(error as unknown as ApiError)} />
			) : (
				<>
					{undeliveredOrders?.length != 0 ? (
						<OrderTable
							ModalDeliver={handleDeliverOrder}
							ModalDelete={handleDelete}
							tableName="Undelivered Orders"
							ordersToDisplay={undeliveredOrders}
						/>
					) : (
						<div className="mt-3 rounded-md border-b border-gray-200 bg-green-100 p-2 text-center">
							<h1 className="text-xl font-semibold text-green-600">
								All orders fullfiled! Congratulations!
							</h1>
						</div>
					)}

					<OrderTable
						ModalDelete={handleDelete}
						ModalDeliver={handleDeliverOrder}
						tableName="Delivered Orders"
						ordersToDisplay={deliveredOrders}
					/>
				</>
			)}
		</div>
	);
};

export default OrderManagement;
