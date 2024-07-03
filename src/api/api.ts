import { IAuth } from '@/types/data';
import axios from './axios';

export const signUp = async ({ name, email, password }: IAuth) => {
	try {
		const response = await axios.post('/auth/signup', {
			name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error('Error during sign up:', error);
		throw error;
	}
};

export const signIn = async ({ email, password }: IAuth) => {
	try {
		const response = await axios.post('/auth/login', {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error('Error during sign in:', error);
		throw error;
	}
};
