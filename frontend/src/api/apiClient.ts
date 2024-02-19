/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	async (config) => {
		if (localStorage.getItem('userInfo'))
			config.headers.authorization = `Bearer ${
				JSON.parse(localStorage.getItem('userInfo')!).token
			}`;
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default apiClient;
