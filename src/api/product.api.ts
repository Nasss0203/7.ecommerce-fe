import { IProduct } from "@/types/data";
import { getUserIdAndToken } from "@/utils";
import axios from "./axios";

export const searchProduct = async (keySearch: string) => {
	try {
		const response = await axios.get(`/product/search/${keySearch}`);
		return response.data;
	} catch (error) {
		console.error("Error search product", error);
		throw error;
	}
};

export const createNewProduct = async (ProductController: IProduct) => {
	console.log("ProductController~", ProductController);
	try {
		const { refreshToken, userId } = getUserIdAndToken();
		const response = await axios.post(
			"/product",
			{
				...ProductController,
			},
			{
				headers: {
					"x-client-id": userId,
					"x-rtoken-id": refreshToken,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error create new product", error);
		throw error;
	}
};

export const findAllProducts = async () => {
	try {
		const response = await axios.get("/product");
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all product", error);
		throw error;
	}
};

export const findProductById = async (id: string | null) => {
	try {
		const response = await axios.get(`/product/${id}`);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all product", error);
		throw error;
	}
};

//Publish
export const findAllDraftsForShop = async () => {
	try {
		const { refreshToken, userId } = getUserIdAndToken();
		const response = await axios.get("/product/drafts/all", {
			headers: {
				"x-client-id": userId,
				"x-rtoken-id": refreshToken,
			},
		});
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all draft product", error);
		throw error;
	}
};

export const findAllPublishForShop = async () => {
	try {
		const { refreshToken, userId } = getUserIdAndToken();
		const response = await axios.get("/product/publish/all", {
			headers: {
				"x-client-id": userId,
				"x-rtoken-id": refreshToken,
			},
		});

		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error find all publish product", error);
		throw error;
	}
};

export const actionPublishProduct = async (id: string) => {
	try {
		const { refreshToken, userId } = getUserIdAndToken();

		const response = await axios.post(
			`/product/publish/${id}`,
			{},
			{
				headers: {
					"x-client-id": userId,
					"x-rtoken-id": refreshToken,
				},
			},
		);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error action publish product", error);
		throw error;
	}
};

export const unActionPublishProduct = async (id: string) => {
	try {
		const { refreshToken, userId } = getUserIdAndToken();

		const response = await axios.post(
			`/product/unpublish/${id}`,
			{},
			{
				headers: {
					"x-client-id": userId,
					"x-rtoken-id": refreshToken,
				},
			},
		);
		const data = response?.data;
		return data;
	} catch (error) {
		console.error("Error action unpublish product", error);
		throw error;
	}
};

export const updatedProduct = async (
	productId: string,
	productController: IProduct,
) => {
	console.log("ProductController~", productController);
	try {
		const { refreshToken, userId } = getUserIdAndToken();
		const response = await axios.patch(
			`/product/${productId}`,
			{
				...productController,
				product_auth: userId,
			},
			{
				headers: {
					"x-client-id": userId,
					"x-rtoken-id": refreshToken,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error updated product", error);
		throw error;
	}
};
