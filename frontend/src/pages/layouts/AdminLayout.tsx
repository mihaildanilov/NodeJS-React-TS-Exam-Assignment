/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useGetAllContactUsMessages, useGetAllOrdersQuery } from '../../hooks';

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const { data: orders } = useGetAllOrdersQuery();
	const undeliveredOrdersCount = orders?.filter((order) => order.isDelivered === false).length;

	const { data: messages } = useGetAllContactUsMessages();
	const unansweredMessageCount = messages?.filter(
		(message) => message.isAnswered === false
	).length;

	const [isTabletOrPhone, setIsTabletOrPhone] = useState<boolean>(false);
	useEffect(() => {
		function handleResize() {
			setIsTabletOrPhone(window.innerWidth < 1024);
		}
		if (window.innerWidth > 1024) {
			setIsSidebarOpen(true);
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div>
			{isTabletOrPhone ? (
				<div className="pb-6">
					<button
						onClick={toggleSidebar}
						data-drawer-target="default-sidebar"
						data-drawer-toggle="default-sidebar"
						aria-controls="default-sidebar"
						type="button"
						className="absolute ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
						<span className="sr-only">Open sidebar</span>
						<svg
							className="h-6 w-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								clipRule="evenodd"
								fillRule="evenodd"
								d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
							/>
						</svg>
					</button>
				</div>
			) : null}
			<aside
				id="default-sidebar"
				className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} `}
				aria-label="Sidebar">
				<div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						{isTabletOrPhone ? (
							<li>
								<button
									onClick={toggleSidebar}
									className="ml-3 mt-2 block items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:inline-flex"
									type="button">
									<span className="sr-only">Open sidebar</span>
									<svg
										className="h-6 w-6"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											clipRule="evenodd"
											fillRule="evenodd"
											d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
										/>
									</svg>
								</button>
							</li>
						) : null}
						<li className=" flex items-center rounded-lg p-2 pl-11 text-gray-900 dark:text-white ">
							Admin Panel
						</li>
						<li>
							<NavLink
								to=""
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
									<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
								</svg>
								<span className="ml-3">Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="users"
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="ml-3 flex-1 whitespace-nowrap">Users</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="products"
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="ml-3 flex-1 whitespace-nowrap">Products</span>
							</NavLink>
						</li>

						<li>
							<NavLink
								to="inbox"
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
									<path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
								</svg>
								<span className="ml-3 flex-1 whitespace-nowrap">Inbox</span>
								{unansweredMessageCount! > 0 ? (
									<span className="inline-flex items-center rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-medium text-green-800">
										New {unansweredMessageCount}
									</span>
								) : null}
							</NavLink>
						</li>

						<li>
							<NavLink
								to="orders"
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="ml-3 flex-1 whitespace-nowrap">Orders</span>
								{undeliveredOrdersCount! > 0 ? (
									<span className="inline-flex items-center rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-medium text-green-800">
										New {undeliveredOrdersCount}
									</span>
								) : null}
							</NavLink>
						</li>
						<li>
							<NavLink
								to="send-newsletter"
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<svg
									aria-hidden="true"
									className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
									<path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
								</svg>
								<span className="ml-3 flex-1 whitespace-nowrap">Newsletter</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/"
								className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
								<FontAwesomeIcon
									className="pl-1 text-gray-400"
									icon={faArrowLeft}
								/>
								<span className="ml-3 flex-1 whitespace-nowrap">Back to Store</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</aside>
			<div className="p-4 lg:ml-64">
				<Outlet />
			</div>
			<ToastContainer autoClose={4000} />
		</div>
	);
};
export default AdminLayout;
