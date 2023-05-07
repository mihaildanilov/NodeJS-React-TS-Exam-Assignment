import { createBrowserRouter } from 'react-router-dom';
import {
	Dashboard,
	UserManagement,
	ProductManagement,
	ContactUsManagement,
	OrderManagement,
	UpdateProductInfo,
} from '../pages/admin';
import {
	Profile,
	Settings,
	CartPage,
	ShippingPage,
	PaymentPage,
	PlaceOrderPage,
	OrderPage,
	InvoicePage,
} from '../pages/customer';
import { AdminLayout, DefaultLayout } from '../pages/layouts';
import {
	PageNotFound,
	MainPage,
	Store,
	ProductPage,
	ContactUS,
	SignUp,
	SignInPage,
} from '../pages/main';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
	{ path: '*', element: <PageNotFound /> },
	{
		path: '/admin',
		element: <ProtectedAdminRoute component={AdminLayout} />,
		children: [
			{
				path: '/admin',
				element: <ProtectedAdminRoute component={Dashboard} />,
			},
			{
				path: 'users',
				element: <ProtectedAdminRoute component={UserManagement} />,
			},
			{
				path: 'products',
				element: <ProtectedAdminRoute component={ProductManagement} />,
			},
			{
				path: 'inbox',
				element: <ProtectedAdminRoute component={ContactUsManagement} />,
			},
			{
				path: 'orders',
				element: <ProtectedAdminRoute component={OrderManagement} />,
			},
			{
				path: '/admin/products/:slug',
				element: <UpdateProductInfo />,
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
				element: <CartPage />,
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
