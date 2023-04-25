import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import ChildrenProps from '../types/ChildrenProps';

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
});

export const ContextProvider = (props: ChildrenProps) => {
	const [currentUser, setCurrentUser] = useState({
		name: 'Mihail Danilov',
		email: 'mihaildanilov793@gmail.com',
		imageUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	});
	const [userToken, setUserToken] = useState<string | null>('123');

	return (
		<StateContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				userToken,
				setUserToken,
			}}>
			{props.children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
