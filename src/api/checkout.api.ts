import axios from "./axios";

interface ICheckcoutCart {
	cartId: string;
	userId: number;
	shop_order_ids: {
		authId: string;
		shop_discounts: {
			shop_id: string;
			discoutId: string;
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
	shop_order_ids: [
		{
			authId,
			shop_discounts: [{ shop_id, discoutId, codeId }],
			item_products: [{ productId, quantity, price }],
		},
	],
}: ICheckcoutCart) => {
	try {
		const response = await axios.post("/checkout/review", {
			cartId,
			userId,
			shop_order_ids: [
				{
					authId,
					shop_discounts: { shop_id, discoutId, codeId },
					item_products: [{ productId, quantity, price }],
				},
			],
		});
		console.log("response~", response.data);

		return response.data;
	} catch (error) {
		console.error("Error checkoutCart:", error);
		throw error;
	}
};
