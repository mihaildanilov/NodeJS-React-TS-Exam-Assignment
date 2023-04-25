import { useEffect, useReducer } from 'react';
import { ProductListItemProps } from '../types/ProductList';
import { getError } from '../utils/utils';
import { ApiError } from '../types/ApiError';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

interface State {
	products: ProductListItemProps[];
	loading: boolean;
	error: string;
}

type Action =
	| { type: 'FETCH_REQUEST' }
	| {
			type: 'FETCH_SUCCESS';
			payload: ProductListItemProps[];
	  }
	| { type: 'FETCH_FAIL'; payload: string };

const initialState: State = {
	products: [],
	loading: true,
	error: '',
};

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, products: action.payload || [], loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const ProductList = () => {
	const [{ loading, error, products }, dispatch] = useReducer<React.Reducer<State, Action>>(
		reducer,
		initialState
	);
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				const result = await axios.get('/api/products');
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) });
			}
		};
		fetchData();
	}, []);

	return loading ? (
		<LoadingBox text="Action in progress" />
	) : error ? (
		<MessageBox message={error}></MessageBox>
	) : (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Our products</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((item, index) => {
						return <ProductListItem key={index} index={index} item={item} />;
					})}
				</div>
			</div>
		</div>
	);
};
const ProductListItem = ({ index, item }: { index: number; item: ProductListItemProps }) => {
	return (
		<div key={index} className="group relative">
			<div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
				<img
					src={item.imageSrc}
					alt={item.imageAlt}
					className="h-full w-full object-cover object-center lg:h-full lg:w-full"
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700">
						<a href={item.href}>
							<span aria-hidden="true" className="absolute inset-0" />
							{item.name}
						</a>
					</h3>
					<p className="mt-1 text-sm text-gray-500">{item.color}</p>
				</div>
				<p className="text-sm font-medium text-gray-900">{item.price}$</p>
			</div>
		</div>
	);
};
export default ProductList;
