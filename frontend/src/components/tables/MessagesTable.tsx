import { useState } from 'react';
import { ContactUs } from '../../types';
import { NavLink } from 'react-router-dom';

import { formatDate } from '../../utils';

interface MessagesTableProps {
	messagesToDisplay: ContactUs[] | undefined;
	tableName: string;
}
const MessagesTable = (props: MessagesTableProps) => {
	let totalMessageCount = 0;
	if (props.messagesToDisplay !== undefined) {
		totalMessageCount = props.messagesToDisplay?.length;
	}

	const [showMore, setShowMore] = useState(false);

	const orders = props.messagesToDisplay
		?.slice()
		.reverse()
		.map((message, index) => {
			return (
				<tr key={index}>
					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="flex items-center">
							<div className="ml-4">
								<div className="text-sm font-medium leading-5 text-gray-500">
									{message._id}
								</div>
							</div>
						</div>
					</td>

					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="text-sm leading-5 text-gray-500">{message.user?.name}</div>
					</td>
					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="text-sm leading-5 text-gray-500">
							{formatDate(message.createdAt)}
						</div>
					</td>
					<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
						<div className="text-sm leading-5 text-gray-500">{message.subject}</div>
					</td>

					<td className="whitespace-nowrap border-b border-gray-200 p-4 text-sm leading-5">
						<span
							className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium ${
								message.isAnswered
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-800'
							}`}>
							{message.isAnswered ? 'Answered' : 'Waiting for reply'}
						</span>
					</td>

					<td className="whitespace-nowrap border-b px-6 py-4  text-sm leading-5 text-gray-500">
						<NavLink to={`/admin/inbox/${message._id}`}>
							{message.answeredAt ? 'View' : 'Reply'}
						</NavLink>
					</td>
				</tr>
			);
		});
	return (
		<div>
			<div className="mt-8 flex flex-col">
				<div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
						<table className="min-w-full">
							<caption className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
								{props.tableName}
							</caption>
							<thead>
								<tr>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Message ID
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										User Name
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Date
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Subject
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Status
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Details
									</th>
								</tr>
							</thead>

							<tbody className="bg-white">
								{showMore ? orders : orders?.slice(0, 5)}
							</tbody>
						</table>
					</div>
					{}
					{totalMessageCount > 5 ? (
						<button
							className={`mt-3 rounded-md bg-blue-600 p-2 py-1.5 font-medium text-blue-50 hover:bg-blue-500 
						`}
							onClick={() => setShowMore(!showMore)}>
							{showMore ? 'Show less' : 'Show more'}
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default MessagesTable;
