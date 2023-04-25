import { useEffect, useReducer } from 'react';
import { ProductListItemProps } from '../types/ProductList';
import { getError } from '../utils/utils';
import { ApiError } from '../types/ApiError';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { ProductListItem } from './ProductListItem';

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

export default ProductList;
