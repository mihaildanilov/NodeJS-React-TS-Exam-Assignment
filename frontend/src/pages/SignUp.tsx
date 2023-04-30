import { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils/utils';
import { useStateContext } from '../context/ContextProvider';
import { signUp } from '../hooks/userHooks';

const SignUp = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get('redirect');
	const redirect = redirectInUrl ? redirectInUrl : '/';

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { state, dispatch } = useStateContext();
	const { userInfo } = state;

	const submitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}
		try {
			const data = await signUp(name, email, password);
			dispatch({ type: 'USER_SIGNIN', payload: data });
			localStorage.setItem('userInfo', JSON.stringify(data));
			navigate(redirect);
			toast.success('Successful registration !', {
				position: toast.POSITION.TOP_CENTER,
			});
		} catch (err) {
			toast.error(getError(err as ApiError), {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);
	return (
		<div>
			<div className="flex min-h-full items-center justify-center  px-4 pt-[7rem] sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign up for free
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{' '}
						<NavLink
							className="font-medium text-indigo-600 hover:text-indigo-500"
							to={`/signin?redirect=${redirect}`}>
							login to existing account
						</NavLink>
					</p>
					<form onSubmit={submitHandler} className="mt-8 space-y-6">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="name-surname" className="sr-only">
									Name Surname
								</label>
								<input
									id="name-surname"
									name="name-surname"
									type="text"
									required
									onChange={(e) => setName(e.target.value)}
									className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Name Surname"
								/>
							</div>
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									required
									onChange={(e) => setEmail(e.target.value)}
									className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									required
									onChange={(e) => setPassword(e.target.value)}
									className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Password"
								/>
							</div>
							<div>
								<label htmlFor="confirm-password" className="sr-only">
									Confirm password
								</label>
								<input
									id="confirm-password"
									name="confirm-password"
									type="password"
									required
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Confirm password"
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default SignUp;
