import { getUserIdAndToken } from "@/utils";
import axios from "./axios";

interface IAmountDiscount {
	codeId: string;
	userId: number | string;
	authId: string;
	products: {
		productId: string;
		quantity: number;
		price: number;
	}[];
}

export const amountDiscount = async ({
	codeId,
	userId,
	authId,
	products: [{ price, productId, quantity }],
}: IAmountDiscount) => {
	const response = await axios.post("/discount/amount", {
		codeId,
		userId,
		authId,
		products: [{ price, productId, quantity }],
	});
	return response.data;
};

export const getListDiscountByShop = async (shopId: string) => {
	const { refreshToken, userId } = getUserIdAndToken();
	const response = await axios.get("/discount", {
		params: {
			shopId,
		},
		headers: {
			"x-client-id": userId,
			"x-rtoken-id": refreshToken,
		},
	});
	return response.data;
};

export const getProductCodeDiscount = async ({
	code,
	authId,
}: {
	code: string;
	authId: string;
}) => {
	const response = await axios.get("/discount/list_product_code", {
		params: {
			code,
			authId,
		},
	});
	return response.data;
};
