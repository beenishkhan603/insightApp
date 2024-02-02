import axios from 'axios';

const ApiRequest = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 100000,
	headers: {
		Authorization: `${
			typeof window !== 'undefined' ? localStorage.getItem('token') : null
		}`,
	},
	// withCredentials: true,
});

ApiRequest.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
ApiRequest.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);
export default ApiRequest;
