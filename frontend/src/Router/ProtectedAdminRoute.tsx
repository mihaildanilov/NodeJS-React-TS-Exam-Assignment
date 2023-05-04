import { useStateContext } from '../context/ContextProvider';
import { ComponentType, ReactNode } from 'react';
import PageNotFound from '../pages/PageNotFound';

type ProtectedRouteProps = {
	component: ComponentType<unknown>;
	children?: ReactNode;
};

const ProtectedAdminRoute = ({ component: Component }: ProtectedRouteProps) => {
	const {
		state: { userInfo },
	} = useStateContext();

	return userInfo?.isAdmin ? <Component /> : <PageNotFound />;
};

export default ProtectedAdminRoute;
