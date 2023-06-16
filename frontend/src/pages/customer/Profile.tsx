/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { toast } from 'react-toastify';
import { OrderHistory } from '../../components';
import MessageHistory from '../../components/MessageHistory';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useStateContext } from '../../context/ContextProvider';
import { useGetMessageHistoryQuery, useGetOrderHistoryQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageComponent } from '../layouts';
import { useState } from 'react';
import { useUpdateProfileMutation } from '../../hooks/userHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
	const { isLoading: isLoadingOrderHistory, error: errorOrderHistory } =
		useGetOrderHistoryQuery();
	const { isLoading: isLoadingMessageHistory, error: errorMessageHistory } =
		useGetMessageHistoryQuery();
	const {
		state: { userInfo },
		dispatch,
	} = useStateContext();
	const [name, setName] = useState(userInfo!.name);
	const [email, setEmail] = useState(userInfo!.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(
		userInfo!.subscribedToNewsletter
	);
	const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation();
	const signoutHandler = () => {
		dispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('cartItems');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		window.location.href = '/signin';
	};
	const submitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			if (password === '' && confirmPassword === '') {
				toast.error('Please enter your password');
				return;
			}
			if (password !== confirmPassword) {
				toast.error('Passwords do not match');
				return;
			}
			const data = await updateProfile({
				name,
				email,
				password,
				subscribedToNewsletter,
			});
			dispatch({ type: 'USER_SIGNIN', payload: data });
			localStorage.setItem('userInfo', JSON.stringify(data));
			toast.success('User data updated successfully. Please login again!');
		} catch (err) {
			toast.error(getError(err as ApiError));
		}
		setTimeout(() => {
			signoutHandler();
		}, 4000);
	};
	const [showForm, setShowForm] = useState(false);

	return (
		<PageComponent title="Profile">
			<div className="bg-white">
				<div className=" flex flex-row justify-center pt-6">
					<p className="text-2xl font-bold tracking-tight text-gray-900">
						{userInfo?.name}
					</p>
					<FontAwesomeIcon
						icon={faPencil}
						className="ml-3 rounded-md bg-blue-600 p-2 font-medium text-blue-50 hover:bg-blue-500"
						onClick={() => setShowForm(!showForm)}
					/>
				</div>

				{showForm ? (
					<div className="mx-auto w-[90%] sm:w-[60%] lg:w-[40%]">
						<form onSubmit={submitHandler}>
							<div>
								<div>
									<div className="flex flex-col">
										<label
											htmlFor="name"
											className="mb-1 font-medium text-gray-600">
											Name
										</label>
										<input
											id="name"
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="email"
											className="mb-1 font-medium text-gray-600">
											Email
										</label>
										<input
											id="email"
											type="text"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
								</div>
								<div>
									<div className="flex flex-col">
										<label
											htmlFor="password"
											className="mb-1 font-medium text-gray-600">
											Password
										</label>
										<input
											id="password"
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="confirm-password"
											className="mb-1 font-medium text-gray-600">
											Confirm Password
										</label>
										<input
											id="confirm-password"
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="confirm-password"
											className="mb-1 font-medium text-gray-600">
											Subscribed to newsletter
										</label>
										<div className="flex flex-row">
											<input
												id="confirm-password"
												type="checkbox"
												checked={subscribedToNewsletter}
												onChange={(e) =>
													setSubscribedToNewsletter(e.target.checked)
												}
												className="rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none"
											/>
											<p>{userInfo?.subscribedToNewsletter ? 'Yes' : 'No'}</p>
										</div>
									</div>
								</div>
								<div className="mt-4 flex justify-center">
									<button
										disabled={isLoading}
										className="w-[200px] rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
										type="submit">
										Update my credentials
									</button>
								</div>
							</div>
						</form>
					</div>
				) : null}
				<div className="pt-1 sm:pt-2">
					{isLoadingMessageHistory ? (
						<LoadingBox text="Loading message history" />
					) : errorMessageHistory ? (
						<MessageBoxError message={getError(errorMessageHistory as ApiError)} />
					) : (
						<MessageHistory />
					)}
				</div>
				<div className="pt-8 sm:py-16">
					{isLoadingOrderHistory ? (
						<LoadingBox text="Loading order history" />
					) : errorOrderHistory ? (
						<MessageBoxError message={getError(errorOrderHistory as ApiError)} />
					) : (
						<OrderHistory />
					)}
				</div>
			</div>
		</PageComponent>
	);
};

export default Profile;
