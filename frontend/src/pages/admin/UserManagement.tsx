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
			<MessageBoxError message={getError(error as unknown as ApiError)} />
		</div>
	) : (
		<div>
			<div className="rounded-md border-b border-gray-200 bg-gray-50 p-4 pt-3">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					User management
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track users of your website and change user info.
				</p>
			</div>
			<div className="mt-3 flex flex-col">
				<div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Name Surname
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Email
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Status
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Role
									</th>
									<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
										Action
									</th>
								</tr>
							</thead>

							<tbody className="bg-white">
								{users?.map((user, index) => (
									<tr key={index}>
										<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
											<div className="text-sm leading-5 text-gray-500">
												{user.name}
											</div>
										</td>
										<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
											<div className="text-sm leading-5 text-gray-500">
												{user.email}
											</div>
										</td>

										<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
											<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
												Active
											</span>
										</td>

										<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm leading-5 text-gray-500">
											{user.isAdmin ? ' Admin' : 'Customer'}
										</td>

										<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm font-medium leading-5">
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
