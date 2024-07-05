import { IAuth } from '@/types/data';
import axios from './axios';

export const register = async ({ name, email, password }: IAuth) => {
	try {
		const response = await axios.post('/auth/register', {
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
		const token = response.data.metadata.tokens;
		if (token) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}

		return response.data;
	} catch (error) {
		console.error('Error during sign in:', error);
		throw error;
	}
};

export const isAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return {};
	}
	return JSON.parse(user);
};
