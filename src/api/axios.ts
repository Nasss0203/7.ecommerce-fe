import { IBackEnd } from "@/types/data";
import { Mutex } from "async-mutex";
import axios from "axios";
const mutex = new Mutex();
axios.defaults.baseURL = import.meta.env.VITE_URL as string;

interface RefreshTokenResponse {
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
}

const instance = axios.create({
	baseURL: import.meta.env.VITE_URL as string,
	headers: {
		"x-api-key": import.meta.env.VITE_API_KEY as string,
	},
	// withCredentials: true,
});

const handleRefreshToken = async (): Promise<string | null> => {
	return await mutex.runExclusive(async () => {
		const res = await instance.post<IBackEnd<RefreshTokenResponse>>(
			"/auth/refreshToken",
		);
		console.log("Response from refresh token endpoint:", res);
		if (res && res.data) {
			console.log(
				"New refresh token:",
				res.data.metadata.tokens.refreshToken,
			);
			return res.data.metadata.tokens.refreshToken;
		} else {
			return null;
		}
	});
};

// Add a request interceptor
instance.interceptors.request.use(
	async (config) => {
		console.log("Truoc khi request::::");

		// if (
		// 	(config.url && config.url.indexOf("/auth/login") >= 0) ||
		// 	(config.url && config.url.indexOf("/auth/refreshToken") >= 0)
		// ) {
		// 	return config;
		// }
		// const auth = window.localStorage.getItem("auth");
		// if (auth) {
		// 	const dataAuth = JSON.parse(auth);
		// 	const accessToken = dataAuth.tokens.accessToken;

		// 	config.headers["Authorization"] = `Bearer ${accessToken}`;
		// }

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// console.log("error~", error);
		// const originalRequest = error.config;
		// if (error.response.status === 401 && !originalRequest._retry) {
		// 	originalRequest._retry = true;
		// 	const auth = window.localStorage.getItem("auth");
		// 	if (auth) {
		// 		const dataAuth = JSON.parse(auth);
		// 		const refreshToken = dataAuth.tokens.refreshToken;
		// 		try {
		// 			const response = await instance.post("/auth/refreshToken", {
		// 				refreshToken,
		// 			});

		// 			// Cập nhật accessToken mới vào localStorage
		// 			localStorage.setItem(
		// 				"auth",
		// 				JSON.stringify({
		// 					...dataAuth,
		// 					tokens: {
		// 						...dataAuth.tokens,
		// 						accessToken: response.data.accessToken,
		// 					},
		// 				}),
		// 			);

		// 			// Thử lại yêu cầu gốc với accessToken mới
		// 			originalRequest.headers[
		// 				"Authorization"
		// 			] = `Bearer ${response.data.accessToken}`;
		// 			return axios(originalRequest);
		// 		} catch (refreshError) {
		// 			// Xử lý lỗi làm mới token
		// 			console.error("Lỗi khi làm mới token:", refreshError);
		// 			// Ví dụ: Đăng xuất người dùng
		// 			localStorage.removeItem("auth");
		// 			window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
		// 			return Promise.reject(refreshError);
		// 		}
		// 	}
		// }
		return Promise.reject(error);
	},
);
export default instance;
