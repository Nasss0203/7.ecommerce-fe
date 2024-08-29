import { createOrder } from "@/api/order.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchListCart } from "./cart.slice";

interface ICreateOrder {
	userId: string;
	cartId: string;
	checkoutId: string;
	use_address: {
		street: string;
		city: string;
		country: string;
	};
}

interface OrderCheckout {
	feeShip: number;
	grandTotal: number;
	totalApplyDiscount: number;
	totalPrice: number;
}

interface OrderProduct {
	discount: number;
	price: number;
	productId: string;
	quantity: number;
	totalPrice: number;
}

interface Order {
	order_cancel?: any; // Không rõ kiểu dữ liệu từ hình, có thể điều chỉnh sau
	order_checkout: OrderCheckout;
	order_products: OrderProduct[];
	order_status:
		| "pending"
		| "confirmed"
		| "shipped"
		| "cancelled"
		| "delivered";
	order_tracking: string;
	order_userId: string;
}

export const createCheckout = createAsyncThunk(
	"order/createCheckout",
	async (payload: ICreateOrder, thunkAPI) => {
		const {
			cartId,
			checkoutId,
			use_address: { city, country, street },
			userId,
		} = payload;
		const response = await createOrder({
			cartId,
			checkoutId,
			use_address: { city, country, street },
			userId,
		});
		const data = response?.metadata;
		if (data) {
			thunkAPI.dispatch(fetchListCart({ userId }));
		}
		return data;
	},
);

const initialState: {
	order: Order;
} = {
	order: {
		order_cancel: "",
		order_checkout: {
			feeShip: 0,
			grandTotal: 0,
			totalApplyDiscount: 0,
			totalPrice: 0,
		},
		order_status: "pending",
		order_userId: "",
		order_tracking: "",
		order_products: [
			{
				discount: 0,
				price: 0,
				productId: "",
				quantity: 0,
				totalPrice: 0,
			},
		],
	},
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createCheckout.fulfilled, (state, action) => {
			state.order = action.payload;
		});
	},
});

// Export hành động và reducer
export const {} = orderSlice.actions;
export default orderSlice.reducer;
