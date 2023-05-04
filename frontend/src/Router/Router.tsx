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
import PaymentPage from '../pages/PaymentPage';
import ProtectedRoute from './ProtectedRoute';
import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderPage from '../pages/OrderPage';
import InvoicePage from '../pages/InvoicePage';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import UsersManagment from '../pages/admin/UserManagment';
import ProductManagment from '../pages/admin/ProductManagment';
import ContactUsManagment from '../pages/admin/ContactUsManagment';
import OrderManagment from '../pages/admin/OrderManagment';
import WebsiteManagment from '../pages/admin/WebsiteManagment';

const router = createBrowserRouter([
	{ path: '*', element: <PageNotFound /> },
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				path: '/admin',
				element: <ProtectedAdminRoute component={Dashboard} />,
			},
			{
				path: 'users',
				element: <ProtectedAdminRoute component={UsersManagment} />,
			},
			{
				path: 'products',
				element: <ProtectedAdminRoute component={ProductManagment} />,
			},
			{
				path: 'inbox',
				element: <ProtectedAdminRoute component={ContactUsManagment} />,
			},
			{
				path: 'orders',
				element: <ProtectedAdminRoute component={OrderManagment} />,
			},
			{
				path: 'settings',
				element: <ProtectedAdminRoute component={WebsiteManagment} />,
			},
		],
	},
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
				element: <ProtectedRoute component={Profile} />,
			},
			{
				path: 'settings',
				element: <ProtectedRoute component={Settings} />,
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
				element: <ProtectedRoute component={ShippingPage} />,
			},
			{
				path: 'payment',
				element: <ProtectedRoute component={PaymentPage} />,
			},
			{
				path: 'placeorder',
				element: <ProtectedRoute component={PlaceOrderPage} />,
			},
			{
				path: '/order/:id',
				element: <ProtectedRoute component={OrderPage} />,
			},
			{
				path: '/invoice/:id',
				element: <ProtectedRoute component={InvoicePage} />,
			},
		],
	},
]);

export default router;
