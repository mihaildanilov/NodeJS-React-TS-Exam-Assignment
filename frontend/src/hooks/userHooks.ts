import axios from 'axios';

export const signUp = async (name: string, email: string, password: string) => {
	const data = { name, email, password };
	const response = await axios.post('http://localhost:4000/api/users/signup', data);
	return response.data;
};
export const signIn = async (email: string, password: string) => {
	const data = { email, password };
	const response = await axios.post('http://localhost:4000/api/users/signin', data);
	return response.data;
};
