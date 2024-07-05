import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/v1/api/';

const instance = axios.create({
	baseURL: 'http://localhost:3000/v1/api/',
	// timeout: 1000,
	headers: {
		'x-api-key': `${import.meta.env.VITE_API_KEY}`,
	},
});

// Add a request interceptor
instance.interceptors.request.use(
	async (config) => {
		// Do something before request is sent
		if (!config.headers['x-api-key']) {
			config.headers['x-api-key'] = import.meta.env.VITE_API_KEY;
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	},
);

export default instance;
