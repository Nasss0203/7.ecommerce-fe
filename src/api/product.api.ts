import { IProduct } from '@/types/data';
import axios from './axios';
import { isAuthenticated } from './auth.api';

const returnUserIdAndRefreshToken = () => {
	const user = isAuthenticated();
	const refreshToken = user?.metadata?.tokens?.refreshToken as string;
	const userId = user?.metadata?.data?._id as string;

	return {
		refreshToken,
		userId,
	};
};

export const createNewProduct = async (ProductController: IProduct) => {
	try {
		const user = isAuthenticated();
		const refreshToken = user?.metadata?.tokens?.refreshToken;
		const client = user?.metadata?.data?._id;

		const response = await axios.post(
			'/product',
			{
				...ProductController,
			},
			{
				headers: {
					'x-client-id': client,
					'x-rtoken-id': refreshToken,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error create new product', error);
		throw error;
	}
};

export const findAllProducts = async () => {
	try {
		const response = await axios.get('/product');
		const data = response?.data;
		return data;
	} catch (error) {
		console.error('Error find all product', error);
		throw error;
	}
};

export const findProductById = async (id: string) => {
	try {
		const response = await axios.get(`/product/${id}`);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error('Error find all product', error);
		throw error;
	}
};

//Publish
export const findAllDraftsForShop = async () => {
	try {
		const { refreshToken, userId } = returnUserIdAndRefreshToken();
		const response = await axios.get('/product/drafts/all', {
			headers: {
				'x-client-id': userId,
				'x-rtoken-id': refreshToken,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error('Error find all draft product', error);
		throw error;
	}
};

export const findAllPublishForShop = async () => {
	try {
		const { refreshToken, userId } = returnUserIdAndRefreshToken();
		const response = await axios.get('/product/publish/all', {
			headers: {
				'x-client-id': userId,
				'x-rtoken-id': refreshToken,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error('Error find all publish product', error);
		throw error;
	}
};

export const actionPublishProduct = async (id: string) => {
	try {
		const { refreshToken, userId } = returnUserIdAndRefreshToken();
		const response = await axios.post(
			`/product/publish/${id}`,
			{},
			{
				headers: {
					'x-client-id': userId,
					'x-rtoken-id': refreshToken,
				},
			},
		);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error('Error action publish product', error);
		throw error;
	}
};

export const unActionPublishProduct = async (id: string) => {
	try {
		// const { refreshToken, userId } = returnUserIdAndRefreshToken();
		const user = isAuthenticated();
		const refreshToken = user?.metadata?.tokens?.refreshToken;
		const client = user?.metadata?.data?._id;
		console.log('userId: ', client);
		console.log('refreshToken: ', refreshToken);
		const response = await axios.post(
			`/product/unpublish/${id}`,
			{},
			{
				headers: {
					'x-client-id': client,
					'x-rtoken-id': refreshToken,
				},
			},
		);
		const data = response;
		return data;
	} catch (error) {
		console.error('Error action unpublish product', error);
		throw error;
	}
};
