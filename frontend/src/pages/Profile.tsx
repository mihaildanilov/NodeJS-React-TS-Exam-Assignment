import PageComponent from '../components/PageComponent';
import { useGetOrderHistoryQuery } from '../hooks/orderHook';
import LoadingBox from '../components/LoadingBox';
import { MessageBoxError } from '../components/MessageBox';
import { getError } from '../utils/utils';
import { ApiError } from '../types/ApiError';
import OrderHistory from '../components/OrderHistory';

const Profile = () => {
	const { isLoading, error } = useGetOrderHistoryQuery();
	return (
		<PageComponent title="Profile">
			{isLoading ? (
				<LoadingBox text="Loading order history" />
			) : error ? (
				<MessageBoxError message={getError(error as ApiError)} />
			) : (
				<div className="bg-white">
					<div className="py-16 sm:py-24">
						<OrderHistory />
					</div>
				</div>
			)}
		</PageComponent>
	);
};

export default Profile;
