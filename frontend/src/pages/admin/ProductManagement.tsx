import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import { NavLink } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import { MessageBoxError } from '../../components/MessageBox';
import { ApiError } from '../../types/ApiError';
import { getError, toBase64 } from '../../utils/utils';
import { useGetProductQuery } from '../../hooks/productHook';
import { toast } from 'react-toastify';

const ProductManagement = () => {
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [image, setImage] = useState<File | null>(null);
	const [imageAlt, setImageAlt] = useState('');
	const [price, setPrice] = useState(0);
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [rating, setRating] = useState(0);
	const [numberOfReviews, setNumberOfReviews] = useState(0);
	const [color, setColor] = useState('');
	const [showForm, setShowForm] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('slug', slug);
		formData.append('image', image as Blob);
		formData.append('imageAlt', imageAlt);
		formData.append('price', price.toString());
		formData.append('brand', brand);
		formData.append('category', category);
		formData.append('description', description);
		formData.append('countInStock', countInStock.toString());
		formData.append('rating', rating.toString());
		formData.append('numberOfReviews', numberOfReviews.toString());
		formData.append('color', color);

		try {
			await apiClient.post('/api/products', formData);
			toast.success('Product added successfully');
		} catch (err) {
			toast.error(getError(err as unknown as ApiError));
		}
	};
	const { data: products, isLoading, error } = useGetProductQuery();

	return (
		<div className="p-4 sm:ml-64">
			<div className="border-gray-200 pt-3 p-4 bg-gray-50 border-b rounded-md">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					Product managment
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track the performance of your products, handle customer feedback and returns,
					and explore new product ideas.
				</p>
				<button
					onClick={() => setShowForm(!showForm)}
					className={`mt-3 p-2 rounded-md bg-blue-600 py-1.5 font-medium text-blue-50 hover:bg-blue-500 '
						}`}>
					{showForm ? 'Hide add new product form' : 'Show add new product form'}
				</button>

				{showForm ? (
					<form onSubmit={handleSubmit} className="flex flex-col ">
						<div className="flex flex-row">
							<div className="w-[50%]">
								<div className="flex flex-col">
									<label
										htmlFor="name"
										className="text-gray-600 font-medium mb-1">
										Name
									</label>
									<input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="slug"
										className="text-gray-600 font-medium mb-1">
										Slug
									</label>
									<input
										id="slug"
										type="text"
										value={slug}
										onChange={(e) => setSlug(e.target.value)}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="image"
										className="text-gray-600 font-medium mb-1">
										Image
									</label>
									<input
										id="image"
										type="file"
										onChange={async (e) => {
											const base64 = await toBase64(
												e.target.files
													? e.target.files[0]
													: new File([222 as unknown as BlobPart], '222')
											);
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
											setImage(base64 as any);
										}}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="imageAlt"
										className="text-gray-600 font-medium mb-1">
										Image Alt
									</label>
									<input
										id="imageAlt"
										type="text"
										value={imageAlt}
										onChange={(e) => setImageAlt(e.target.value)}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="price"
										className="text-gray-600 font-medium mb-1">
										Price
									</label>
									<input
										id="price"
										type="number"
										value={price}
										onChange={(e) => setPrice(parseFloat(e.target.value))}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="brand"
										className="text-gray-600 font-medium mb-1">
										Brand
									</label>
									<input
										id="brand"
										type="text"
										value={brand}
										onChange={(e) => setBrand(e.target.value)}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
							</div>
							<div className="w-[50%]">
								<div className="flex flex-col">
									<label
										htmlFor="category"
										className="text-gray-600 font-medium mb-1">
										Category
									</label>
									<input
										id="category"
										type="text"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label>Description:</label>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label>Count in Stock:</label>
									<input
										type="number"
										value={countInStock}
										onChange={(e) => setCountInStock(parseInt(e.target.value))}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label>Rating:</label>
									<input
										type="number"
										value={rating}
										onChange={(e) => setRating(parseInt(e.target.value))}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label>Number of reviews:</label>
									<input
										type="number"
										value={numberOfReviews}
										onChange={(e) =>
											setNumberOfReviews(parseInt(e.target.value))
										}
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col">
									<label>Category:</label>
									<input
										type="text"
										className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
										value={color}
										onChange={(e) => setColor(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="pt-4 ">
							<button
								className="py-2 px-4  bg-blue-500 text-white rounded hover:bg-blue-700"
								type="submit">
								Add new product
							</button>
						</div>
					</form>
				) : null}
			</div>
			{isLoading ? (
				<div className="pt-[3.25rem] sm:ml-[20rem]">
					<LoadingBox text="Action in progress" />
				</div>
			) : error ? (
				<div className="pt-[3.25rem] sm:ml-[20rem]">
					<MessageBoxError message={getError(error as unknown as ApiError)} />
				</div>
			) : (
				<div>
					<div className="flex flex-col mt-8">
						<div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
								<table className="min-w-full">
									<thead>
										<tr>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Product name
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Brand
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Price
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Count in Stock
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Review count
											</th>
											<th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
										</tr>
									</thead>

									<tbody className="bg-white">
										{products?.map((product, index) => (
											<tr key={index}>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10">
															<img
																className="h-10 w-10 rounded-md"
																src={product.imageSrc}
																alt={product.imageAlt}
															/>
														</div>

														<div className="ml-4">
															<div className="text-sm leading-5 font-medium text-gray-900">
																{product.name}
															</div>
														</div>
													</div>
												</td>

												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													<div className="text-sm leading-5 text-gray-900">
														{product.brand}
													</div>
												</td>

												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
													{product.price}
												</td>

												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
													{product.countInStock}
												</td>
												<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
													{product.numberOfReviews}
												</td>

												<td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
													<NavLink
														to={`/admin/products/${product.slug}`}
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
			)}
		</div>
	);
};

export default ProductManagement;
