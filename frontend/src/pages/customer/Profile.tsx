import { OrderHistory } from '../../components';
import MessageHistory from '../../components/MessageHistory';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useStateContext } from '../../context/ContextProvider';
import { useGetMessageHistoryQuery, useGetOrderHistoryQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageComponent } from '../layouts';

const Profile = () => {
	const { isLoading: isLoadingOrderHistory, error: errorOrderHistory } =
		useGetOrderHistoryQuery();
	const { isLoading: isLoadingMessageHistory, error: errorMessageHistory } =
		useGetMessageHistoryQuery();
	const {
		state: { userInfo },
	} = useStateContext();
	return (
		<PageComponent title="Profile">
			<div className="bg-white">
				<h2 className="mx-auto max-w-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					{userInfo?.name}
				</h2>
				<div className="pt-16 sm:pt-24">
					{isLoadingMessageHistory ? (
						<LoadingBox text="Loading message history" />
					) : errorMessageHistory ? (
						<MessageBoxError message={getError(errorMessageHistory as ApiError)} />
					) : (
						<MessageHistory />
					)}
				</div>
				<div className="pt-8 sm:py-16">
					{isLoadingOrderHistory ? (
						<LoadingBox text="Loading order history" />
					) : errorOrderHistory ? (
						<MessageBoxError message={getError(errorOrderHistory as ApiError)} />
					) : (
						<OrderHistory />
					)}
				</div>
			</div>
		</PageComponent>
	);
};

export default Profile;
