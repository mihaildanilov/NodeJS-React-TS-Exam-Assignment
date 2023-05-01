import { NavLink, useNavigate } from 'react-router-dom';
import { useGetOrderHistoryQuery } from '../hooks/orderHook';
import { Fragment, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';

const OrderHistory = () => {
	const navigate = useNavigate();
	const { data: orders } = useGetOrderHistoryQuery();
	const [showMore, setShowMore] = useState(false);

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

	const orderHistory = orders
		?.slice()
		.reverse()
		.map((order) => {
			return (
				<div key={order._id} className="mt-2">
					<h2 className="sr-only">Recent orders</h2>
					<div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
						<div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
							<div className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border">
								<h3 className="sr-only">
									Order placed on <time dateTime={formatDate(order.createdAt)} />
								</h3>

								<div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
									<dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
										<div className="mr-6 sm:mr-0">
											<dt className="font-medium text-gray-900">
												Order number
											</dt>
											<dd className="mt-1 text-gray-500">{order._id}</dd>
										</div>
										<div className="hidden sm:block ml-[6rem] sm:pr-0">
											<dt className="font-medium text-gray-900 whitespace-nowrap">
												Date placed
											</dt>
											<dd className="mt-1 text-gray-500 whitespace-nowrap">
												<time>{formatDate(order.createdAt)}</time>
											</dd>
										</div>
										<div className="ml-[7rem] sm:pr-0">
											<dt className="font-medium text-gray-900 whitespace-nowrap">
												Total amount
											</dt>
											<dd className="mt-1 font-medium text-gray-900">
												${order.totalPrice.toFixed(2)}
											</dd>
										</div>
									</dl>

									<div className="relative flex justify-end lg:hidden">
										{/* dropdown Small screen */}

										<Menu as="div" className="relative inline-block text-left">
											<div className="flex-shrink-0">
												<Menu.Button className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:outline-none">
													<span className="sr-only">
														Open options menu
													</span>
													<svg
														className="w-6 h-6"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														aria-hidden="true">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
														/>
													</svg>
												</Menu.Button>
											</div>

											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95">
												<Menu.Items
													className="absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
													static>
													<div className="py-1">
														<Menu.Item>
															{({ active }) => (
																<NavLink
																	to={`/order/${order._id}`}
																	className={`${
																		active
																			? 'bg-gray-100 text-gray-900'
																			: 'text-gray-700'
																	} block px-4 py-2 text-sm`}>
																	View
																</NavLink>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<NavLink
																	to={`/invoice/${order._id}`}
																	className={`${
																		active
																			? 'bg-gray-100 text-gray-900'
																			: 'text-gray-700'
																	} block px-4 py-2 text-sm`}>
																	Invoice
																</NavLink>
															)}
														</Menu.Item>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
									<div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
										<a
											href="#"
											className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											<span
												onClick={() => {
													navigate(`/order/${order._id}`);
												}}>
												View Order
											</span>
											<span className="sr-only">WU88191111</span>
										</a>
										<a
											onClick={() => {
												navigate(`/invoice/${order._id}`);
											}}
											className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											<span>View Invoice</span>
											<span className="sr-only">for order {order._id}</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});

	return (
		<>
			<div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
				<div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
					<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
						Order history
					</h1>
					<p className="mt-2 text-sm text-gray-500">
						Check the status of recent orders, manage returns, and discover similar
						products.
					</p>
					{showMore ? orderHistory : orderHistory?.slice(0, 3)}
					<button
						onClick={() => setShowMore(!showMore)}
						className={`mt-2 ml-7 p-2 rounded-md bg-blue-600 py-1.5 font-medium text-blue-50 hover:bg-blue-500 '
						}`}>
						{showMore ? 'Show less' : 'Show more'}
					</button>
				</div>
			</div>

			{}
		</>
	);
};

export default OrderHistory;
