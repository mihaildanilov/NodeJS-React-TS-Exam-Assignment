import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../api/apiClient';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetProductQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError, toBase64 } from '../../utils';

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
		<div>
			<div className="rounded-md border-b border-gray-200 bg-gray-50 p-4 pt-3">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					Product managment
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track the performance of your products, handle customer feedback and returns,
					and explore new product ideas.
				</p>
				<button
					onClick={() => setShowForm(!showForm)}
					className={
						'mt-3 rounded-md bg-blue-600 p-2 py-1.5 font-medium text-blue-50 hover:bg-blue-500'
					}>
					{showForm ? 'Hide add new product form' : 'Show add new product form'}
				</button>

				{showForm ? (
					<form onSubmit={handleSubmit} className="flex flex-col ">
						<div className="flex flex-row">
							<div className="w-[50%]">
								<div className="flex flex-col">
									<label
										htmlFor="name"
										className="mb-1 font-medium text-gray-600">
										Name
									</label>
									<input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="slug"
										className="mb-1 font-medium text-gray-600">
										Slug
									</label>
									<input
										id="slug"
										type="text"
										value={slug}
										onChange={(e) => setSlug(e.target.value)}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="image"
										className="mb-1 font-medium text-gray-600">
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
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="imageAlt"
										className="mb-1 font-medium text-gray-600">
										Image Alt
									</label>
									<input
										id="imageAlt"
										type="text"
										value={imageAlt}
										onChange={(e) => setImageAlt(e.target.value)}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="price"
										className="mb-1 font-medium text-gray-600">
										Price
									</label>
									<input
										id="price"
										type="number"
										value={price}
										onChange={(e) => setPrice(parseFloat(e.target.value))}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="brand"
										className="mb-1 font-medium text-gray-600">
										Brand
									</label>
									<input
										id="brand"
										type="text"
										value={brand}
										onChange={(e) => setBrand(e.target.value)}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
							</div>
							<div className="w-[50%]">
								<div className="flex flex-col">
									<label
										htmlFor="category"
										className="mb-1 font-medium text-gray-600">
										Category
									</label>
									<input
										id="category"
										type="text"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label>Description:</label>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label>Count in Stock:</label>
									<input
										type="number"
										value={countInStock}
										onChange={(e) => setCountInStock(parseInt(e.target.value))}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label>Rating:</label>
									<input
										type="number"
										value={rating}
										onChange={(e) => setRating(parseInt(e.target.value))}
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
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
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div className="flex flex-col">
									<label>Category:</label>
									<input
										type="text"
										className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
										value={color}
										onChange={(e) => setColor(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="pt-4 ">
							<button
								className="rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-700"
								type="submit">
								Add new product
							</button>
						</div>
					</form>
				) : null}
			</div>
			{isLoading ? (
				<LoadingBox text="Action in progress" />
			) : error ? (
				<MessageBoxError message={getError(error as unknown as ApiError)} />
			) : (
				<div>
					<div className="mt-8 flex flex-col">
						<div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
							<div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
								<table className="min-w-full">
									<thead>
										<tr>
											<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
												Product name
											</th>
											<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
												Brand
											</th>
											<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
												Price
											</th>
											<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
												Count in Stock
											</th>
											<th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
												Review count
											</th>
											<th className="border-b border-gray-200 bg-gray-50 px-6 py-3" />
										</tr>
									</thead>

									<tbody className="bg-white">
										{products?.map((product, index) => (
											<tr key={index}>
												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="flex items-center">
														<div className="h-10 w-10 flex-shrink-0">
															<img
																className="h-10 w-10 rounded-md"
																src={product.imageSrc}
																alt={product.imageAlt}
															/>
														</div>

														<div className="ml-4">
															<div className="text-sm font-medium leading-5 text-gray-500">
																{product.name}
															</div>
														</div>
													</div>
												</td>

												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{product.brand}
													</div>
												</td>

												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4">
													<div className="text-sm leading-5 text-gray-500">
														{product.price}
													</div>
												</td>

												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm leading-5 text-gray-500">
													{product.countInStock}
												</td>
												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-sm leading-5 text-gray-500">
													{product.numberOfReviews}
												</td>

												<td className="whitespace-nowrap border-b border-gray-200 px-6 py-4 text-right text-sm font-medium leading-5">
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
