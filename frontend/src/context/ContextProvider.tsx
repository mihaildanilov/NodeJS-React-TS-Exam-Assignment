/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

import { Cart, CartItem, ShippingAddress } from '../types/Cart';
import { UserInfo } from '../types/UserInfo';

interface AppState {
	cart: Cart;
	userInfo?: UserInfo;
}

const initialState = () => ({
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo')!)
		: null,

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
	  }
	| {
			type: 'USER_SIGNIN';
			payload: UserInfo;
	  }
	| { type: 'USER_SIGNOUT' }
	| { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
	| { type: 'SAVE_PAYMENT_METHOD'; payload: string };

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
		case 'USER_SIGNIN': {
			return { ...state, userInfo: action.payload };
		}
		case 'USER_SIGNOUT': {
			return {
				cart: {
					cartItems: [],
					paymentMethod: 'PayPal',
					shippingAddress: {
						fullName: '',
						address: '',
						postalCode: '',
						city: '',
						country: '',
					},
					itemsPrice: 0,
					shippingPrice: 0,
					taxPrice: 0,
					totalPrice: 0,
				},
			};
		}
		case 'SAVE_SHIPPING_ADDRESS': {
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: action.payload,
				},
			};
		}
		case 'SAVE_PAYMENT_METHOD': {
			return {
				...state,
				cart: { ...state.cart, paymentMethod: action.payload },
			};
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
	// localStorage.clear(); //BUGIF need to delete all data from local storage
	const [currentUser, setCurrentUser] = useState({
		name: 'Mihail Danilov',
		email: 'mihaildanilov793@gmail.com',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	});
	const [userToken, setUserToken] = useState<string | null>('');
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
