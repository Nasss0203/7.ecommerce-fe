import { IProduct } from '@/types/data';
import axios from './axios';
import { useAuth } from '@/hooks/useAuth';
import { isAuthenticated } from './auth.api';

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
