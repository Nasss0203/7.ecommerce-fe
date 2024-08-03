import { findAllProducts } from "@/api/product.api";
import { IBackEnd, IProduct } from "@/types/data";
import { useEffect, useState } from "react";

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

export const isAuthenticated = (): IAuth | null => {
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

export const getCategory = (product: any, key: string) => {
	return product?.filter((item: any) => item.product_category === key);
};

export const getCategoryProduct = (key: string) => {
	const [data, setData] = useState<IBackEnd<IProduct>>();

	useEffect(() => {
		getAllProducts();
	}, []);

	const getAllProducts = async () => {
		const response = await findAllProducts();
		setData(response);
	};

	const product = data?.metadata;
	const productData = getCategory(product, key);

	return productData;
};

export const getCategoryDisplay = (category: string) => {
	switch (category) {
		case "Laptops":
			return "laptop";
		case "Phones":
			return "dien-thoai";
		default:
			return "";
	}
};

export const formatCurrency = (amount: any) => {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(amount);
};
