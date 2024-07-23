import { findAllProducts } from "@/api/product.api";
import { IProduct, IProductResponse } from "@/types/data";
import { useEffect, useState } from "react";

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
	const auth = localStorage.getItem("auth");
	if (!auth) {
		return null;
	}
	return JSON.parse(auth);
};

export const getCategory = (product: any, key: string) => {
	return product?.filter((item: any) => item.product_category === key);
};

export const getCategoryProduct = (key: string) => {
	const [data, setData] = useState<IProductResponse<IProduct>>();

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
