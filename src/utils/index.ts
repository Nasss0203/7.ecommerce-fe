export const getUserIdAndToken = () => {
	const authentication = isAuthenticated();
	const refreshToken = authentication?.tokens?.refreshToken as string;
	const accessToken = authentication?.tokens?.accessToken as string;
	const userId = authentication?.data?._id as string;

	return {
		userId,
		refreshToken,
		accessToken,
	};
};

export const isAuthenticated = () => {
	const auth = localStorage.getItem('auth');
	if (!auth) {
		return null;
	}
	return JSON.parse(auth);
};
