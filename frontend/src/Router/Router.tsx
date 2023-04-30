import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUp from '../pages/SignUp';

import DefaultLayout from '../components/DefaultLayout';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Store from '../pages/Store';
import ContactUS from '../pages/ContactUS';
import MainPage from '../pages/MainPage';
import PageNotFound from '../pages/PageNotFound';
import ProductPage from '../pages/ProductPage';
import Cart from '../pages/CartPage';
import ShippingPage from '../pages/ShippingPage';

const router = createBrowserRouter([
	{ path: '*', element: <PageNotFound /> },
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: 'store',
				element: <Store />,
			},
			{
				path: '/store/product/:slug',
				element: <ProductPage />,
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
			{
				path: 'cart',
				element: <Cart />,
			},
			{
				path: 'signup',
				element: <SignUp />,
			},
			{
				path: 'signin',
				element: <SignInPage />,
			},
			{
				path: 'shipping',
				element: <ShippingPage />,
			},
		],
	},
]);

export default router;
