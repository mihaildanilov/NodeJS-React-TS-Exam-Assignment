/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../api/apiClient';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import { deleteProduct, useGetProductDetailsBySlugQuery } from '../../hooks/productHook';
import { ApiError } from '../../types';
import { getError, toBase64 } from '../../utils';
import { PageNotFound } from '../main';
import ModalWarning from '../../components/modals/ModalWarning';

const UpdateProductInfo = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
			navigate('/admin/products');
		} catch (err) {
			toast.error(getError(err as unknown as ApiError));
		}
	};
	const handleDelete = () => {
		deleteProduct(slug!);
		navigate('/admin/products');
	};

	return isLoading ? (
		<LoadingBox text="Action in progress" />
	) : error ? (
		<MessageBoxError message={getError(error as ApiError)} />
	) : !product ? (
		<PageNotFound />
	) : (
		<div>
			<div className="rounded-md border-b border-gray-200 bg-gray-50 p-4 pt-3">
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
								<label htmlFor="name" className="mb-1 font-medium text-gray-600">
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
								<label htmlFor="slug" className="mb-1 font-medium text-gray-600">
									Slug
								</label>
								<input
									id="slug"
									type="text"
									disabled
									value={slug}
									className="rounded-md border border-gray-400 px-3 py-2 focus:border-blue-500 focus:outline-none"
								/>
							</div>
							<div className="flex flex-col">
								<label htmlFor="image" className="mb-1 font-medium text-gray-600">
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
								<label htmlFor="price" className="mb-1 font-medium text-gray-600">
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
								<label htmlFor="brand" className="mb-1 font-medium text-gray-600">
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
									onChange={(e) => setNumberOfReviews(parseInt(e.target.value))}
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
							Update product
						</button>
					</div>
				</form>
				<div className="mt-4 flex justify-end">
					<ModalWarning
						className="w-[200px] rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
						title="Delete order"
						buttonText="Delete order"
						warningText="Are you sure you want to delete this product: "
						ProceedAction={handleDelete}
						itemName={product.name}
					/>
				</div>
			</div>
		</div>
	);
};

export default UpdateProductInfo;
