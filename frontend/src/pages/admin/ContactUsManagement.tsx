import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetAllContactUsMessages } from '../../hooks/contactUsHook';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import MessagesTable from '../../components/tables/MessagesTable';

const ContactUsManagement = () => {
	const { data: messages, isLoading, error } = useGetAllContactUsMessages();
	const answeredMessage = messages?.filter((message) => message.isAnswered === true);
	const unAnsweredMessage = messages?.filter((message) => message.isAnswered === false);

	return (
		<div>
			<div className="rounded-md border-b border-gray-200 bg-gray-50 p-4 pt-3">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					Contact Us message managment
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Efficiently manage and respond to messages received from customers.
				</p>
			</div>
			{isLoading ? (
				<LoadingBox text="Action in progress" />
			) : error ? (
				<MessageBoxError message={getError(error as unknown as ApiError)} />
			) : (
				<div>
					{unAnsweredMessage?.length != 0 ? (
						<MessagesTable
							tableName="Unaswered Messages"
							messagesToDisplay={unAnsweredMessage}
						/>
					) : (
						<div className="mt-3 rounded-md border-b border-gray-200 bg-green-100 p-2 text-center">
							<h1 className="text-xl font-semibold text-green-600">
								All messages Answered! Congratulations!
							</h1>
						</div>
					)}

					<MessagesTable
						tableName="Unaswered Messages"
						messagesToDisplay={answeredMessage}
					/>
				</div>
			)}
		</div>
	);
};

export default ContactUsManagement;
