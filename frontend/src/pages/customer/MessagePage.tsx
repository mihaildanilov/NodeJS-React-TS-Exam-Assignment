import { useParams } from 'react-router-dom';
import { useGetContactUsMessageByID } from '../../hooks';
import { PageComponent } from '../layouts';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageNotFound } from '../main';

const MessagePage = () => {
	const { id } = useParams<{ id: string }>();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data: message, isLoading, error } = useGetContactUsMessageByID(id!);
	return (
		<PageComponent title={`Message ${id}`}>
			{isLoading ? (
				<div className="pt-[3.25rem] sm:ml-[20rem]">
					<LoadingBox text="Action in progress" />
				</div>
			) : error ? (
				<div className="pt-[3.25rem] sm:ml-[20rem]">
					<MessageBoxError message={getError(error as ApiError)} />
				</div>
			) : !message ? (
				<div className="pt-[3.25rem] sm:ml-[20rem]">
					<PageNotFound />
				</div>
			) : (
				<div className="rounded-md bg-white p-3">
					<h1 className="text-xl font-semibold">Message from {message.user?.name}</h1>
					<h2 className="text-lg font-semibold">
						Subject:<span className="font-normal">{message.subject}</span>
					</h2>
					<p className="text-lg font-semibold">
						Content: <span className="font-normal">{message.customersMessage}</span>
					</p>
					<h1 className="text-lg font-semibold">Reply message from staff:</h1>

					<p>{message.replyMessage}</p>
				</div>
			)}
		</PageComponent>
	);
};

export default MessagePage;
