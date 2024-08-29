import { ICart, IUpdateCart } from "@/types/data";
import axios from "./axios";

export const addCart = async ({
	userId,
	product: {
		productId,
		price,
		shopId,
		quantity,
		name,
		image,
		slug,
		category,
	},
}: ICart) => {
	try {
		const response = await axios.post(`/cart`, {
			userId,
			product: {
				productId,
				price,
				shopId,
				quantity,
				name,
				image,
				slug,
				category,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error Add Cart:", error);
		throw error;
	}
};

export const listCart = async ({ userId }: { userId: string }) => {
	try {
		const response = await axios.get("/cart", {
			params: {
				userId,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error listCart:", error);
		throw error;
	}
};

export const updateCart = async ({ userId, shop_order_ids }: IUpdateCart) => {
	console.log({ userId, shop_order_ids });
	try {
		const response = await axios.post("/cart/update", {
			userId,
			shop_order_ids,
		});
		return response.data;
	} catch (error) {
		console.error("Error updateCart:", error);
		throw error;
	}
};

export const deleteCart = async ({
	userId,
	productId,
}: {
	userId: string;
	productId: string;
}) => {
	try {
		const response = await axios.delete("/cart", {
			data: { userId, productId },
		});
		return response.data;
	} catch (error) {
		console.error("Error updateCart:", error);
		throw error;
	}
};
