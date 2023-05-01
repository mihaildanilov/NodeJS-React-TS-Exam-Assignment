/* eslint-disable indent */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Outlet, NavLink } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';

const navigation = [
	{ name: 'Home', to: '/' },
	{ name: 'Store', to: '/store' },
	{ name: 'Contact Us', to: '/contact' },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const DefaultLayout = () => {
	const {
		state: { cart, userInfo },
		dispatch,
	} = useStateContext();

	const signoutHandler = () => {
		dispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('cartItems');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		window.location.href = '/signin';
	};
	// console.log(cart.cartItems);
	return (
		<>
			<div className="min-h-full">
				<Disclosure as="nav" className="bg-gray-800 fixed w-full z-40 ">
					{({ open }) => (
						<div>
							<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
								<div className="flex h-16 items-center justify-between">
									<div className="flex items-center ">
										<div className="flex-shrink-0">
											<img
												className="h-8 w-8"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
												alt="Kicks Avenue"
											/>
										</div>
										<div className="hidden md:block">
											<div className="ml-10 flex items-baseline space-x-4 ">
												{navigation.map((item) => (
													<NavLink
														key={item.name}
														// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
														to={item.to!}
														className={({ isActive }) =>
															classNames(
																isActive
																	? 'bg-gray-900 text-white'
																	: 'text-gray-300 hover:bg-gray-700 hover:text-white',
																'rounded-md px-3 py-2 text-sm font-medium'
															)
														}>
														{item.name}
													</NavLink>
												))}
											</div>
										</div>
									</div>
									<div className="hidden md:block">
										<div className="ml-4 flex items-center gap-3 md:ml-6">
											<NavLink to="/cart" className="relative pb-3">
												<div className="t-0 absolute left-3 ">
													{cart.cartItems.length > 0 ? (
														<p className="flex h-2 w-2 items-center justify-center rounded-full bg-blue-500 p-3 text-xs text-white">
															{cart.cartItems.reduce(
																(a, c) => a + c.quantity,
																0
															)}
														</p>
													) : (
														''
													)}
												</div>

												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="2"
													stroke="#ffffff"
													className="file: mt-4 h-6 w-6 ">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
													/>
												</svg>
											</NavLink>
											{/* Profile dropdown */}
											{userInfo ? (
												<Menu as="div" className="relative ml-3">
													<div className={'text-gray-300 '}>
														<Menu.Button className="flex max-w-xs items-center rounded-full hover:bg-gray-700 hover:text-white p-2 text-sm ">
															<span className="sr-only">
																Open user menu
															</span>
															<p className="pr-2">{userInfo.name}</p>
															<FontAwesomeIcon icon={faUser} />
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
														<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
															<Menu.Item>
																{({ active }) => (
																	<NavLink
																		to="/profile"
																		className={classNames(
																			active
																				? 'bg-gray-100'
																				: '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}>
																		<p>Your Profile</p>
																	</NavLink>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<NavLink
																		to="/settings"
																		className={classNames(
																			active
																				? 'bg-gray-100'
																				: '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}>
																		<p>Settings</p>
																	</NavLink>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<NavLink
																		to="#signout"
																		onClick={signoutHandler}
																		className={classNames(
																			active
																				? 'bg-gray-100'
																				: '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}>
																		<p>Sign out</p>
																	</NavLink>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</Menu>
											) : (
												<NavLink
													className={({ isActive }) =>
														classNames(
															isActive
																? 'bg-gray-900 text-white'
																: 'text-gray-300 hover:bg-gray-700 hover:text-white',
															'rounded-md px-3 py-2 text-sm font-medium'
														)
													}
													to="signin">
													Sign In
												</NavLink>
											)}
										</div>
									</div>
									<div className="-mr-2 flex md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<Bars3Icon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="md:hidden">
								<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
									{navigation.map((item) => (
										<NavLink
											key={item.name}
											// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
											to={item.to!}
											className={({ isActive }) =>
												classNames(
													isActive
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'block rounded-md px-3 py-2 text-base font-medium'
												)
											}>
											{item.name}
										</NavLink>
									))}
									<NavLink
										to="/cart"
										className={({ isActive }) =>
											classNames(
												isActive
													? 'bg-gray-900 text-white'
													: 'text-gray-300 hover:bg-gray-700 hover:text-white',
												'block rounded-md px-3 py-2 text-base font-medium'
											)
										}>
										{(cart.cartItems.reduce(
											(a, c) => a + c.quantity,
											0
										) as number) === 0 ? (
											<p>Cart</p>
										) : (cart.cartItems.reduce(
												(a, c) => a + c.quantity,
												0
										  ) as number) === 1 ? (
											<p>
												Cart:{' '}
												{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
												item
											</p>
										) : (
											<p>
												Cart:{' '}
												{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
												items
											</p>
										)}
									</NavLink>

									{userInfo ? (
										<div className="border-t border-gray-700 pb-3 pt-4">
											<div className="flex items-center px-5">
												<div className="flex-shrink-0">
													<FontAwesomeIcon
														className={'text-gray-300'}
														icon={faUser}
													/>
												</div>
												<div className="ml-3">
													<div className="text-base font-medium leading-none text-white">
														{userInfo.name}
													</div>
													<div className="text-sm font-medium leading-none text-gray-400">
														{userInfo.email}
													</div>
												</div>
											</div>
											<div className="mt-3 space-y-1 px-2">
												<NavLink
													to="/profile"
													className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
													<p>Your Profile</p>
												</NavLink>
												<NavLink
													to="/settings"
													className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
													<p>Settings</p>
												</NavLink>
												<NavLink
													to=""
													onClick={signoutHandler}
													className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
													<p>Sign out</p>
												</NavLink>
											</div>
										</div>
									) : (
										<NavLink
											className={({ isActive }) =>
												classNames(
													isActive
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'block rounded-md px-3 py-2 text-base font-medium'
												)
											}
											to="/signin">
											Sign In
										</NavLink>
									)}
								</div>
							</Disclosure.Panel>
						</div>
					)}
				</Disclosure>
				<Outlet />
				<ToastContainer />
			</div>
		</>
	);
};

export default DefaultLayout;
