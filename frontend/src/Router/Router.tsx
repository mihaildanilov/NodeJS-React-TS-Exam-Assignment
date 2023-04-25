import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import GuestLayout from '../components/GuestLayout';
import DefaultLayout from '../components/DefaultLayout';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Store from '../pages/Store';
import ContactUS from '../pages/ContactUS';
import MainPage from '../pages/MainPage';
import PageNotFound from '../pages/PageNotFound';

const router = createBrowserRouter([
	{ path: '*', element: <PageNotFound /> },

	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <MainPage />, //TODO in futere will be as main page of the store
			},
			{
				path: '/main',
				element: <MainPage />, //TODO in futere will be as main page of the store
			},

			{
				path: 'store',
				element: <Store />,
			},
			{
				path: 'contact',
				element: <ContactUS />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
			{},
		],
	},
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'signup',
				element: <SignUp />,
			},
		],
	},
]);

export default router;
