/* eslint-disable indent */
import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useReducer,
	Reducer,
} from 'react';
import ChildrenProps from '../types/ChildrenProps';

import { Cart, CartItem } from '../types/Cart';

interface AppState {
	cart: Cart;
}

const initialState = () => ({
	cart: {
		cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
		shippingAddress: JSON.parse(localStorage.getItem('shippingAdress') || '{}'),
		paymentMethod: localStorage.getItem('paymentMethod') || 'PayPal',
		itemsPrice: 0,
		shippingPrice: 0,
		taxPrice: 0,
		totalPrice: 0,
	},
});
type CartAddItemAction =
	| {
			type: 'CART_ADD_ITEM';
			payload: CartItem;
	  }
	| {
			type: 'CART_REMOVE_ITEM';
			payload: CartItem;
	  };

const reducer = (state: AppState, action: CartAddItemAction) => {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item: CartItem) => item._id === newItem._id
			);
			const cartItems = existItem
				? state.cart.cartItems.map((item: CartItem) =>
						item._id === existItem._id ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_REMOVE_ITEM': {
			const cartItems = state.cart.cartItems.filter(
				(item: CartItem) => item._id !== action.payload._id
			);
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		default: {
			return state;
		}
	}
};

const defaultDispatch: Dispatch<CartAddItemAction> = () => initialState;

interface StateContextProps {
	currentUser: {
		name: string;
		email: string;
		imageUrl: string;
	};
	userToken: string | null;
	setCurrentUser: Dispatch<
		SetStateAction<{
			name: string;
			email: string;
			imageUrl: string;
		}>
	>;
	setUserToken: Dispatch<SetStateAction<string | null>>;
	state: AppState;
	dispatch: Dispatch<CartAddItemAction>;
}

const StateContext = createContext<StateContextProps>({
	currentUser: {
		name: '',
		email: '',
		imageUrl: '',
	},
	userToken: null,
	setCurrentUser: () => {},
	setUserToken: () => {},
	state: initialState(),
	dispatch: defaultDispatch,
});

export const ContextProvider = (props: ChildrenProps) => {
	// localStorage.removeItem('cartItems');//!IF need to delete all data from local storage
	const [currentUser, setCurrentUser] = useState({
		name: 'Mihail Danilov',
		email: 'mihaildanilov793@gmail.com',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	});
	const [userToken, setUserToken] = useState<string | null>('123');
	const [state, dispatch] = useReducer<Reducer<AppState, CartAddItemAction>>(
		reducer,
		initialState()
	);

	return (
		<StateContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				userToken,
				setUserToken,
				state,
				dispatch,
			}}>
			{props.children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
