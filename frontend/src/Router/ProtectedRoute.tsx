import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { ComponentType, ReactNode } from 'react';

type ProtectedRouteProps = {
	component: ComponentType<unknown>;
	children?: ReactNode;
};

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
	const {
		state: { userInfo },
	} = useStateContext();

	return userInfo ? <Component /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
