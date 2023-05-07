import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../api/apiClient';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { useGetProductDetailsBySlugQuery } from '../../hooks/productHook';
import { ApiError } from '../../types';
import { getError, toBase64 } from '../../utils';
import { PageNotFound } from '../main';

const UpdateProductInfo = () => {
	const { slug } = useParams<{ slug: string }>();
	console.log(slug);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);
	const [name, setName] = useState(product?.name);
	const [newSlug, setNewSlug] = useState(slug);
	const [image, setImage] = useState<File | null>(null);
	const [imageAlt, setImageAlt] = useState(product?.imageAlt);
	const [price, setPrice] = useState(product?.price);
	const [brand, setBrand] = useState(product?.brand);
	const [category, setCategory] = useState(product?.category);
	const [description, setDescription] = useState(product?.description);
	const [countInStock, setCountInStock] = useState(product?.countInStock);
	const [rating, setRating] = useState(product?.rating);
	const [numberOfReviews, setNumberOfReviews] = useState(product?.numberOfReviews);
	const [color, setColor] = useState(product?.color);
	useEffect(() => {
		setName(product?.name);
		setNewSlug(product?.slug);
		setImage(null);
		setImageAlt(product?.imageAlt);
		setPrice(product?.price);
		setBrand(product?.brand);
		setCategory(product?.category);
		setDescription(product?.description);
		setCountInStock(product?.countInStock);
		setRating(product?.rating);
		setNumberOfReviews(product?.numberOfReviews);
		setColor(product?.color);
	}, [slug, product]);
	// if (!isLoading && product) {
	// 	setName(product?.name);
	// }
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(slug);
		if (!product) {
			return;
		}
		const formData = new FormData();
		formData.append('id', product._id);
		if (name !== undefined) {
			formData.append('name', name);
		}
		if (newSlug !== undefined) {
			formData.append('slug', newSlug);
		}
		if (image !== undefined && image !== null) {
			formData.append('image', image);
		}
		if (imageAlt !== undefined) {
			formData.append('imageAlt', imageAlt);
		}
		if (price !== undefined) {
			formData.append('price', price.toString());
		}
		if (brand !== undefined) {
			formData.append('brand', brand);
		}
		if (category !== undefined) {
			formData.append('category', category);
		}
		if (description !== undefined) {
			formData.append('description', description);
		}
		if (countInStock !== undefined) {
			formData.append('countInStock', countInStock.toString());
		}
		if (rating !== undefined) {
			formData.append('rating', rating.toString());
		}
		if (numberOfReviews !== undefined) {
			formData.append('numberOfReviews', numberOfReviews.toString());
		}
		if (color !== undefined) {
			formData.append('color', color);
		}

		try {
			await apiClient.put(`/api/products/slug/${product.slug}`, formData);
			toast.success('Product updated successfully');
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
	) : !product ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<PageNotFound />
		</div>
	) : (
		<div className="p-4 sm:ml-64">
			<div className="border-gray-200 pt-3 p-4 bg-gray-50 border-b rounded-md">
				<h1 className="text-2xl font-bold tracking-tight  text-gray-500 sm:text-3xl">
					Product managment
				</h1>
				<p className="mt-2 text-lg  text-gray-500">
					Track the performance of your products, handle customer feedback and returns,
					and explore new product ideas.
				</p>
				<form onSubmit={handleSubmit} className="flex flex-col ">
					<div className="flex flex-row">
						<div className="w-[50%]">
							<div className="flex flex-col">
								<label htmlFor="name" className="text-gray-600 font-medium mb-1">
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
								<label htmlFor="slug" className="text-gray-600 font-medium mb-1">
									Slug
								</label>
								<input
									id="slug"
									type="text"
									disabled
									value={slug}
									className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="image" className="text-gray-600 font-medium mb-1">
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
								<label htmlFor="price" className="text-gray-600 font-medium mb-1">
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
								<label htmlFor="brand" className="text-gray-600 font-medium mb-1">
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
									onChange={(e) => setNumberOfReviews(parseInt(e.target.value))}
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
							Update product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateProductInfo;
