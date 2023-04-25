import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';
import { ContextProvider } from './context/ContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ContextProvider>
			<RouterProvider router={router} />
		</ContextProvider>
	</React.StrictMode>
);
