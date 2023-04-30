import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../components/PageComponent';
import { useStateContext } from '../context/ContextProvider';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useStateContext();
	const {
		userInfo,
		cart: { shippingAddress },
	} = state;

	useEffect(() => {
		if (!userInfo) {
			navigate('/signin?redirect=/shipping');
		}
	}, [userInfo, navigate]);

	const [fullName, setFullName] = useState(shippingAddress.fullName || '');
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
	const [country, setCountry] = useState(shippingAddress.country || '');

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: {
				fullName,
				address,
				city,
				postalCode,
				country,
			},
		});
		localStorage.setItem(
			'shippingAddress',
			JSON.stringify({
				fullName,
				address,
				city,
				postalCode,
				country,
			})
		);

		navigate('/payment');
	};
	return (
		<PageComponent title="Shipping page">
			<div className="isolate bg-white px-6 sm:py-8 lg:px-8 h-screen lg:h-[calc(100vh-12.5rem)]  sm:h-[calc(100vh - 10rem)] ">
				<h1 className="text-2xl font-bold mb-6 ">Shipping Address</h1>
				<CheckoutSteps step1 step2 />
				<form className="pt-7" onSubmit={submitHandler}>
					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
						<div>
							<label htmlFor="fullName" className="block mb-2 font-bold">
								Full Name
							</label>
							<input
								type="text"
								id="fullName"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="address" className="block mb-2 font-bold">
								Address
							</label>
							<input
								type="text"
								id="address"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="city" className="block mb-2 font-bold">
								City
							</label>
							<input
								type="text"
								id="city"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="postalCode" className="block mb-2 font-bold">
								Postal Code
							</label>
							<input
								type="text"
								id="postalCode"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="country" className="block mb-2 font-bold">
								Country
							</label>
							<input
								type="text"
								id="country"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							/>
						</div>
						<div className="mb-6">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Continue
							</button>
						</div>
					</div>
				</form>
			</div>
		</PageComponent>
	);
};

export default ShippingPage;
