import { OrderHistory } from '../../components';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetOrderHistoryQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageComponent } from '../layouts';

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
