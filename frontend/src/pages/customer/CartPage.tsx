import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../../context/ContextProvider';
import { CartItem } from '../../types';
import { PageComponent } from '../layouts';
import { ModalOutOfStock } from '../../components/modals';

const CartPage = () => {
	const navigate = useNavigate();
	const {
		state: {
			cart: { cartItems },
		},
		dispatch,
	} = useStateContext();
	const [isOutOfStock, setIsOutOfStock] = useState(false);
	const updateCartHandler = (item: CartItem, quantity: number) => {
		if (item.countInStock < quantity) {
			setIsOutOfStock(true);
			return;
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		});
	};

	const checkoutHandler = () => {
		navigate('/signin?redirect=/shipping');
	};

	const removeItemHandler = (item: CartItem) => {
		dispatch({
			type: 'CART_REMOVE_ITEM',
			payload: item,
		});
	};

	let subTotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
	const tax = subTotal * 0.21;
	subTotal = subTotal - tax;
	let shipping = 0;
	if (subTotal > 0) {
		shipping = 20.99;
	}
	const total = subTotal + tax + shipping;

	return (
		<PageComponent title="Cart">
			<div className="h-screen bg-gray-100 pt-20">
				<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
					<div className="rounded-lg md:w-2/3">
						{cartItems?.map((item, index) => {
							return (
								<div
									key={index}
									className="mb-6 flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md sm:flex-row">
									<img
										src={item.imageSrc}
										alt="product-image"
										className="mb-4 w-full rounded-lg sm:mb-0 sm:w-40"
									/>
									<div className="ml-0 flex flex-col justify-between sm:ml-4 sm:w-full">
										<div className="mb-4 sm:mb-0">
											<h2 className="text-lg font-bold text-gray-900">
												{item.name}
											</h2>
											<p className="text-sm">Price: {item.price}$</p>
										</div>
										<div className="flex flex-col items-center gap-4 sm:flex-row">
											<p className="text-sm">
												Total price: {item.price * item.quantity}$
											</p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												onClick={() => removeItemHandler(item)}
												strokeWidth="1.5"
												stroke="currentColor"
												className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</div>
										<div className="flex items-center border-gray-100">
											<span
												onClick={() =>
													updateCartHandler(
														item,
														Math.max(item.quantity - 1, 1)
													)
												}
												className="cursor-pointer rounded-l border-r-2 bg-gray-100 px-3.5 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50">
												-
											</span>
											<ModalOutOfStock
												isOpen={isOutOfStock}
												onClose={() => setIsOutOfStock(false)}
												itemName={item.name}
											/>
											<span className="px-3">{item.quantity}</span>
											<span
												onClick={() =>
													updateCartHandler(item, item.quantity + 1)
												}
												className="cursor-pointer rounded-r border-l-[1px] bg-gray-100 px-3 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50">
												+
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
						<div className="mb-2 flex justify-between">
							<p className="text-gray-700">Subtotal:</p>
							<p className="text-gray-700">
								({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
								{subTotal.toFixed(2)}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Tax:</p>
							<p className="text-gray-700">${tax.toFixed(2)}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Shipping:</p>
							<p className="text-gray-700">${shipping}</p>
						</div>
						<hr className="my-4" />
						<div className="flex justify-between">
							<p className="text-lg font-bold">Total</p>
							<div className="">
								<p className="mb-1 text-lg font-bold">${total.toFixed(2)} USD</p>
								<p className="text-sm text-gray-700">including VAT</p>
							</div>
						</div>
						<button
							onClick={checkoutHandler}
							disabled={cartItems.length === 0}
							className={`mt-6 w-full rounded-md bg-blue-600 py-1.5 font-medium text-blue-50 hover:bg-blue-500 ${
								cartItems.length === 0 ? 'disabled:cursor-not-allowed' : ''
							}`}>
							Check Out
						</button>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default CartPage;
