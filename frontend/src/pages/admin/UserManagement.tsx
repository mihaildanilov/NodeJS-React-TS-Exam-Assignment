import { NavLink } from 'react-router-dom';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetAllUsersQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';

const UserManagement = () => {
	const { data: users, isLoading, error } = useGetAllUsersQuery();

	return isLoading ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<LoadingBox text="Action in progress" />
		</div>
	) : error ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<MessageBoxError message={getError(error as unknown as ApiError)}></MessageBoxError>
		</div>
	) : (
		<div className="p-4 sm:ml-64">
			<div className="border-gray-200 pt-3 p-4 bg-gray-50 border-b rounded-md">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					User management
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track users of your website and change user info.
				</p>
			</div>
			<div className="flex flex-col mt-3">
				<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Name Surname
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
										Role
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
								</tr>
							</thead>

							<tbody className="bg-white">
								{users?.map((user, index) => (
									<tr key={index}>
										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</div>

												<div className="ml-4">
													<div className="text-sm leading-5 font-medium text-gray-900">
														{user.name}
													</div>
												</div>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="text-sm leading-5 text-gray-900">
												{user.email}
											</div>
										</td>

										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Active
											</span>
										</td>

										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
											{user.isAdmin ? ' Admin' : 'Customer'}
										</td>

										<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
											<NavLink
												to="" //TODO add page to customize user data
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
		</div>
	);
};

export default UserManagement;
