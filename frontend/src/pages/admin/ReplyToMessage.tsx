import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetContactUsMessageByID } from '../../hooks';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { PageNotFound } from '../main';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

const ReplyToMessage = () => {
	const { id } = useParams<{ id: string }>();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data: message, isLoading, error } = useGetContactUsMessageByID(id!);

	const [replyMessage, setReplyMessage] = useState('');
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message) {
			return;
		}
		const replyData = new FormData();
		replyData.append('id', message._id);
		replyData.append('replyMessage', replyMessage);
		try {
			await apiClient.put(`api/contact-us/message/${id}`, replyData);
			toast.success('Replied to message successfully');
			navigate('/admin/inbox');
		} catch (err) {
			toast.error(getError(err as unknown as ApiError));
		}
	};

	return isLoading ? (
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
			<h1 className="text-lg font-semibold">Reply message:</h1>
			{message.isAnswered ? (
				<p>{message.replyMessage}</p>
			) : (
				<form onSubmit={handleSubmit} className="flex flex-col">
					<textarea
						required
						className="sm: w-full rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none md:w-1/2"
						onChange={(e) => setReplyMessage(e.target.value)}
					/>
					<div className="pt-4">
						<button
							className="rounded bg-blue-500  px-3 py-1.5 text-white hover:bg-blue-700"
							type="submit">
							Reply to message
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ReplyToMessage;
