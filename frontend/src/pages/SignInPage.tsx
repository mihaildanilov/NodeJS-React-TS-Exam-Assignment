import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
// import { useSignInMutation } from '../hooks/userHooks';
import { getError } from '../utils/utils';
import { ApiError } from '../types/ApiError';
import axios from 'axios';
const SignInPage = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get('redicrect');
	const redirect = redirectInUrl ? redirectInUrl : '/';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { state, dispatch } = useStateContext();
	const { userInfo } = state;

	// const { mutateAsync } = useSignInMutation(); //!Solve this issue

	const signIn = async (email: string, password: string) => {
		//TODO: implement in diffrent file
		const data = { email, password };
		const response = await axios.post('http://localhost:4000/api/users/signin', data);
		return response.data;
	};

	const submitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		console.log('Submited');
		try {
			// const data = await mutateAsync({ email, password }); //!Solve this issue
			const data = await signIn(email, password);
			dispatch({ type: 'USER_SIGNIN', payload: data });
			localStorage.setItem('userInfo', JSON.stringify(data));
			navigate(redirect);
			console.log(data);
		} catch (err) {
			console.log(getError(err as ApiError));
			console.log('Sign-in unsuccessful. Data:', err as string);
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	return (
		<div>
			<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{' '}
						<NavLink
							to={`/signup?redirect=${redirect}`}
							className="font-medium text-indigo-600 hover:text-indigo-500">
							or register a new one
						</NavLink>
					</p>
					<form onSubmit={submitHandler} className="mt-8 space-y-6">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
									required
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
									autoComplete="current-password"
									onChange={(e) => setPassword(e.target.value)}
									required
									className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500">
									Forgot your password?
								</a>
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
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
