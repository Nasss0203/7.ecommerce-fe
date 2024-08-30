import { getAllOrderAdmin, updateOrderByAdmin } from "@/api/order.api";
import { IResponse } from "@/types/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
	_id?: string;
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
	createdOn?: any;
}

export const listOrder = createAsyncThunk(
	"order/listOrder",
	async (payload, thunkAPI) => {
		const response = await getAllOrderAdmin();
		const data = response?.metadata;

		return data;
	},
);

export const updateOrder = createAsyncThunk(
	"order/updateOrder",
	async (payload: any, thunkAPI) => {
		const { orderId, values } = payload;
		const response = await updateOrderByAdmin({
			id: orderId,
			payload: values,
		});
		const data = response?.metadata;
		if (data) {
			thunkAPI.dispatch(listOrder());
		}
		return data;
	},
);

const initialState: {
	listOrder: IResponse<Order[]>;
} = {
	listOrder: {
		currentPage: 0,
		data: [
			{
				_id: "",
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
				createdOn: Date,
			},
		],
		totalPages: 0,
	},
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(listOrder.fulfilled, (state, action) => {
			state.listOrder = action.payload;
		});
	},
});

// Export hành động và reducer
export const {} = orderSlice.actions;
export default orderSlice.reducer;
