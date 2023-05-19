/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
	usePayPalScriptReducer,
	SCRIPT_LOADING_STATE,
	PayPalButtonsComponentProps,
	PayPalButtons,
} from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	LoadingBox,
	MessageBoxError,
	MessageBoxSuccess,
	MessageBoxWarning,
} from '../../components/toasts';
import {
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPaypalClientIdQuery,
} from '../../hooks';
import { ApiError } from '../../types';
import { formatDate, getError } from '../../utils';
import { PageComponent } from '../layouts';

const OrderPage = () => {
	const params = useParams();
	const { id: orderId } = params;

	const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId!);

	const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation();

	const testPayHandler = async () => {
		await payOrder({ orderId: orderId! });
		refetch();
		toast.success('Order is paid');
	};

	const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

	const { data: paypalConfig } = useGetPaypalClientIdQuery();

	useEffect(() => {
		if (paypalConfig && paypalConfig.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypalConfig!.clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({
					type: 'setLoadingStatus',
					value: SCRIPT_LOADING_STATE.PENDING,
				});
			};
			loadPaypalScript();
		}
	}, [paypalConfig, paypalDispatch]);

	const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
		style: { layout: 'vertical' },
		createOrder(data, actions) {
			return actions.order
				.create({
					purchase_units: [
						{
							amount: {
								value: order!.totalPrice.toString(),
							},
						},
					],
				})
				.then((orderID: string) => {
					return orderID;
				});
		},
		onApprove(data, actions) {
			return actions.order!.capture().then(async (details) => {
				try {
					await payOrder({ orderId: orderId!, ...details });
					refetch();
					toast.success('Order is paid successfully');
				} catch (err) {
					toast.error(getError(err as ApiError));
				}
			});
		},
		onError: (err) => {
			toast.error(getError(err as unknown as ApiError));
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

	return isLoading ? (
		<LoadingBox text="Loading" />
	) : error ? (
		<MessageBoxError message={getError(error as unknown as ApiError)} />
	) : !order ? (
		<MessageBoxError message="Order Not Found" />
	) : (
		<PageComponent title={`Order ${orderId}`}>
			<div className="bg-gray-100 px-6 pb-3 pt-16 sm:px-8 lg:px-12">
				<div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
					<div className="col-span-2 space-y-6">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-medium">Shipping</h2>
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
							{order.isDelivered ? (
								<MessageBoxSuccess
									message={`Delivered at ${formatDate(order.deliveredAt)}`}
								/>
							) : (
								<MessageBoxWarning message="Not Delivered" />
							)}
						</div>

						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-medium">Payment</h2>
							<div className="space-y-1">
								<p>
									<strong>Method:</strong> {order.paymentMethod}
								</p>
							</div>
							{order.isPaid ? (
								<MessageBoxSuccess
									message={`Paid at ${formatDate(order.paidAt)}`}
								/>
							) : (
								<MessageBoxWarning message="Not Paid" />
							)}
						</div>

						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-medium">Items</h2>
							<ul className="space-y-4">
								{order.orderItems.map((item) => (
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
						</div>
					</div>

					<div className="space-y-4 rounded-lg bg-white p-6 shadow-md ">
						<h2 className="mb-4 text-lg font-medium">Order Summary</h2>
						<ul className="divide-y divide-gray-200">
							<li className="flex items-center justify-between py-2">
								<span>Sub total</span>
								<span>${order.itemsPrice.toFixed(2)}</span>
							</li>
							<li className="flex items-center justify-between py-2">
								<span>Shipping</span>
								<span>${order.shippingPrice.toFixed(2)}</span>
							</li>
							<li className="flex items-center justify-between py-2">
								<span>Tax</span>
								<span>${order.taxPrice.toFixed(2)}</span>
							</li>
							<li className="flex items-center justify-between py-2">
								<span>
									<strong>Order Total</strong>
								</span>
								<span>
									<strong>${order.totalPrice.toFixed(2)}</strong>
								</span>
							</li>
							<li className="flex flex-col items-center justify-between py-2">
								{!order.isPaid && (
									<div>
										{isPending ? (
											<LoadingBox text="Loading..." />
										) : isRejected ? (
											<MessageBoxError message="Error in connecting to PayPal" />
										) : (
											<div>
												<PayPalButtons {...paypalbuttonTransactionProps} />
												<button
													className="rounded-md bg-indigo-500 px-4 py-2 text-white disabled:opacity-50"
													onClick={testPayHandler}>
													Test Pay
												</button>
											</div>
										)}
										{loadingPay && <LoadingBox text="Loading..." />}
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default OrderPage;
