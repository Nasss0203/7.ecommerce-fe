import { IAuth } from "@/types/data";
import { getUserIdAndToken } from "@/utils";
import axios from "./axios";

export const register = async ({ name, email, password }: IAuth) => {
	try {
		const response = await axios.post("/auth/register", {
			name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error during sign up:", error);
		throw error;
	}
};

export const signIn = async ({ email, password }: IAuth) => {
	try {
		const response = await axios.post("/auth/login", {
			email,
			password,
		});
		const token = response.data.metadata.tokens?.refreshToken;
		if (token) {
			localStorage.setItem("auth", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		console.error("Error during sign in:", error);
		throw error;
	}
};

export const logout = async () => {
	try {
		const { accessToken, userId } = getUserIdAndToken();
		const response = await axios.post("/auth/logout", {
			header: {
				Authorization: accessToken,
				"x-client-id": userId,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error during log out:", error);
		throw error;
	}
};
