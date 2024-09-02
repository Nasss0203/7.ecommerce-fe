import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFindAllProduct } from "@/redux/slice/product.slice";
import { useEffect } from "react";

interface IAuth {
	data: {
		_id: string;
		email: string;
		name: string;
		roles: string[];
	};
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
}

export const isAuthenticate = (): IAuth | null => {
	const auth = localStorage.getItem("auth");
	if (!auth) {
		return null;
	}
	try {
		const parsedAuth: IAuth = JSON.parse(auth);
		return parsedAuth;
	} catch (error) {
		console.error("Failed to parse auth data:", error);
		return null;
	}
};

export const getUserIdAndToken = () => {
	const authentication = isAuthenticate();
	const refreshToken = authentication?.tokens?.refreshToken as string;
	const accessToken = authentication?.tokens?.accessToken as string;
	const userId = authentication?.data?._id as string;

	return {
		userId,
		refreshToken,
		accessToken,
	};
};

export const getCategory = (product: any, key: string) => {
	return product?.data?.filter((item: any) => item.product_category === key);
};

export const getCategoryProduct = (key: string) => {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.product.listProductAll);

	useEffect(() => {
		dispatch(fetchFindAllProduct());
	}, []);

	const product = data?.data;
	const productData = getCategory(product, key);

	return productData;
};

export const getCategoryDisplay = (category: string) => {
	switch (category) {
		case "laptop":
			return "laptop";
		case "phone":
			return "dien-thoai";
		default:
			return "";
	}
};

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(amount);
};

export { formatCurrency };
