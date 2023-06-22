import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { ContextProvider } from './context/ContextProvider';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';

const queryClient = new QueryClient();

const App = () => {
	return (
		<React.StrictMode>
			<ContextProvider>
				<PayPalScriptProvider options={{ 'client-id': 'sb' }} deferLoading={true}>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
						{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					</QueryClientProvider>
				</PayPalScriptProvider>
			</ContextProvider>
		</React.StrictMode>
	);
};

export default App;
