import { NavLink } from 'react-router-dom';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetAllContactUsMessages } from '../../hooks/contactUsHook';
import { ApiError } from '../../types';
import { formatDate, getError } from '../../utils';

const ContactUsManagement = () => {
	const { data: messages, isLoading, error } = useGetAllContactUsMessages();

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
				<div className="pt-6">
					<div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
						<div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
							<table className="min-w-full">
								<thead>
									<tr>
										<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
											Message ID
										</th>
										<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
											Name Surname
										</th>
										<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
											Email
										</th>
										<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
											Subject
										</th>
										<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
											Sent at
										</th>
										<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
											Action
										</th>
									</tr>
								</thead>

								<tbody className="bg-white">
									{messages
										?.slice()
										.reverse()
										.map((message, index) => (
											<tr key={index}>
												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{message._id}
													</div>
												</td>
												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{message.user?.name}
													</div>
												</td>

												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{message.user?.email}
													</div>
												</td>
												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{message.subject}
													</div>
												</td>

												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{formatDate(message.createdAt)}
													</div>
												</td>

												<td className="whitespace-nowrap border-b border-gray-200  px-6 py-4 text-sm font-medium leading-5">
													<NavLink
														to={`/admin/inbox/${message._id}`}
														className="text-indigo-600 hover:text-indigo-900">
														Edit
													</NavLink>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactUsManagement;
