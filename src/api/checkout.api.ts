import axios from "./axios";
interface ICheckcoutCart {
	cartId: string;
	userId: string;
	shop_order_ids: {
		authId: string;
		shop_discounts: {
			shop_id: string;
			discountId: string;
			codeId: string;
		}[];
		item_products: {
			productId: string;
			price: number;
			quantity: number;
		}[];
	}[];
}

export const checkoutCart = async ({
	cartId,
	userId,
	shop_order_ids: [{ authId, shop_discounts, item_products }],
}: ICheckcoutCart) => {
	try {
		const response = await axios.post("/checkout/review", {
			cartId,
			userId,
			shop_order_ids: [
				{
					authId,
					shop_discounts,
					item_products,
				},
			],
		});
		return response.data;
	} catch (error) {
		console.error("Error checkoutCart:", error);
		throw error;
	}
};

export const fetchCheckoutById = async ({
	checkoutId,
}: {
	checkoutId: string;
}) => {
	try {
		const response = await axios.get(`/checkout/review/${checkoutId}`);
		return response.data;
	} catch (error) {
		console.error("Error checkoutCart:", error);
		throw error;
	}
};
