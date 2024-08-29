import { checkoutCart, fetchCheckoutById } from "@/api/checkout.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ICheckout {
	cartId: string;
	userId: string;
	shop_order_ids: [
		{
			authId: string;
			shop_discounts: [
				{
					codeId: string;
					discountId: string;
					shop_id: string;
				},
			];
			item_products: any;
		},
	];
}

interface CheckoutItem {
	productId: string;
	quantity: number;
	price: number;
	image: string;
	discount: number;
	totalPrice: number;
}

interface Checkout {
	_id: string;
	checkout_auth: string;
	checkout_cart: string;
	checkout_items?: CheckoutItem[];
	checkout_totalPrice: number;
	checkout_shippingFee?: number;
	checkout_discount: number;
	checkout_tax?: number;
	checkout_paymentStatus?: "pending" | "paid" | "failed";
	checkout_paymentDetails?: any; // Bạn có thể thay thế 'any' bằng kiểu dữ liệu cụ thể của paymentDetails nếu biết
	checkout_grandTotal: number;
}

export const checkcoutReview = createAsyncThunk(
	"checkout/checkcoutReview",
	async (payload: ICheckout, thunkAPI) => {
		const {
			cartId,
			userId,
			shop_order_ids: [
				{
					authId,
					item_products,
					shop_discounts: [{ codeId, discountId, shop_id }],
				},
			],
		} = payload;
		const response = await checkoutCart({
			cartId: cartId,
			userId: userId,
			shop_order_ids: [
				{
					authId: authId,
					shop_discounts: [
						{
							codeId: codeId,
							discountId: discountId,
							shop_id: shop_id,
						},
					],
					item_products: item_products,
				},
			],
		});
		const data = response?.metadata;
		return data;
	},
);

export const fetchCheckcoutId = createAsyncThunk(
	"checkout/fetchCheckouId",
	async (payload: Checkout, thunkAPI) => {
		const { _id } = payload;
		const response = await fetchCheckoutById({ checkoutId: _id });
		const data = response?.metadata;
		return data;
	},
);

const initialState: {
	isCheckout: boolean;
	listCheckout: Checkout;
	checkoutId: Checkout;
} = {
	isCheckout: true,
	listCheckout: {
		_id: "", // Hoặc null nếu bạn sử dụng ObjectId
		checkout_auth: "",
		checkout_cart: "",
		checkout_items: [],
		checkout_totalPrice: 0,
		checkout_shippingFee: 0,
		checkout_discount: 0,
		checkout_tax: 0,
		checkout_paymentStatus: "pending",
		checkout_paymentDetails: null,
		checkout_grandTotal: 0,
	},
	checkoutId: {
		_id: "", // Hoặc null nếu bạn sử dụng ObjectId
		checkout_auth: "",
		checkout_cart: "",
		checkout_items: [],
		checkout_totalPrice: 0,
		checkout_shippingFee: 0,
		checkout_discount: 0,
		checkout_tax: 0,
		checkout_paymentStatus: "pending",
		checkout_paymentDetails: null,
		checkout_grandTotal: 0,
	},
};

export const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		resetCheckoutCart(state) {
			state.isCheckout = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(checkcoutReview.fulfilled, (state, action) => {
			state.listCheckout = action.payload;
			state.isCheckout = true;
		});
		builder.addCase(fetchCheckcoutId.fulfilled, (state, action) => {
			state.checkoutId = action.payload;
		});
	},
});

// Export hành động và reducer
export const { resetCheckoutCart } = checkoutSlice.actions;
export default checkoutSlice.reducer;
