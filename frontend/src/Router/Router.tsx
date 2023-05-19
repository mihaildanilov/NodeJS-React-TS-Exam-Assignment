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
	ContactUS,
	OrderPage,
	InvoicePage,
} from '../pages/customer';
import { AdminLayout, DefaultLayout } from '../pages/layouts';
import { PageNotFound, MainPage, Store, ProductPage, SignUp, SignInPage } from '../pages/main';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import ProtectedRoute from './ProtectedRoute';
import AboutUs from '../pages/customer/AboutUsPage';
import FAQPage from '../pages/customer/FAQPage';
import ReplyToMessage from '../pages/admin/ReplyToMessage';
import MessagePage from '../pages/customer/MessagePage';
import NewsletterManagement from '../pages/admin/NewsletterManagement';

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
				element: <ProtectedAdminRoute component={UpdateProductInfo} />,
			},
			{
				path: '/admin/inbox/:id',
				element: <ProtectedAdminRoute component={ReplyToMessage} />,
			},
			{
				path: 'send-newsletter',
				element: <ProtectedAdminRoute component={NewsletterManagement} />,
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
				path: 'about',
				element: <AboutUs />,
			},
			{
				path: 'faq',
				element: <FAQPage />,
			},
			{
				path: 'contact',
				element: <ProtectedRoute component={ContactUS} />,
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
			{
				path: '/message/:id',
				element: <ProtectedRoute component={MessagePage} />,
			},
		],
	},
]);

export default router;
