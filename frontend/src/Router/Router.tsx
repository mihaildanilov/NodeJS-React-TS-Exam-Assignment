import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Surveys from '../pages/Surveys';
import SignUp from '../pages/SignUp';
import GuestLayout from '../components/GuestLayout';
import DefaultLayout from '../components/DefaultLayout';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Store from '../pages/Store';
import ContactUS from '../pages/ContactUS';

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Dashboard />, //TODO in futere will be as main page of the store
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
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
				path: 'surveys',
				element: <Surveys />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
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
