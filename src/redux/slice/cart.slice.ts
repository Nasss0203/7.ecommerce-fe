import { addCart, deleteCart, listCart, updateCart } from "@/api/cart.api";
import { ICart, IUpdateCart } from "@/types/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartProduct {
	productId: string;
	name: string;
	image: string;
	price: number;
	quantity: number;
	shopId: string;
}

interface Cart {
	_id: string;
	cart_count_product: number;
	cart_products: CartProduct[];
	cart_state: string;
	cart_userId: number;
	createOn?: Date;
	modifiedOn?: Date;
}

export const fetchListCart = createAsyncThunk(
	"cart/fetchListCart",
	async (payload: { userId: string }, thunkAPI) => {
		const { userId } = payload;
		const response = await listCart({ userId });
		const data = response?.metadata;
		return data;
	},
);

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async (payload: ICart, thunkAPI) => {
		const {
			userId,
			product: { name, price, productId, quantity, shopId, image, slug },
		} = payload;
		const response = await addCart({
			userId,
			product: { name, price, productId, quantity, shopId, image, slug },
		});
		const data = response?.metadata;
		if (data) {
			thunkAPI.dispatch(
				fetchListCart({ userId: "66859264b627f62df4daf95d" }),
			);
		}
		return data;
	},
);

export const updateProductCart = createAsyncThunk(
	"cart/increaseProdctCart",
	async (payload: IUpdateCart, thunkAPI) => {
		const { userId, shop_order_ids } = payload;
		const response = await updateCart({
			userId,
			shop_order_ids,
		});
		const data = response?.metadata;
		if (data) {
			thunkAPI.dispatch(fetchListCart({ userId: userId }));
		}
		return data;
	},
);

export const deteleProductCart = createAsyncThunk(
	"cart/deteleProductCart",
	async (payload: { userId: string; productId: any }, thunkAPI) => {
		const { userId, productId } = payload;
		const response = await deleteCart({
			userId,
			productId,
		});
		const data = response?.metadata;
		console.log("data~", data);
		if (data) {
			thunkAPI.dispatch(fetchListCart({ userId: userId }));
		}
		return data;
	},
);

const initialState: {
	listCart: Cart;
	isAddCart: boolean;
	updateCart: IUpdateCart;
} = {
	listCart: {
		_id: "",
		cart_count_product: 0,
		cart_products: [
			{
				productId: "",
				name: "",
				quantity: 0,
				image: "",
				price: 0,
				shopId: "",
			},
		],
		cart_state: "",
		cart_userId: 0,
	},
	isAddCart: false,
	updateCart: {
		userId: "",
		shop_order_ids: [
			{
				shopId: "",
				item_products: [
					{
						old_quantity: 0,
						price: 0,
						quantity: 0,
						shopId: "",
						productId: "",
					},
				],
			},
		],
	},
};

// Slice quản lý xác thực
export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		resetFetchListCart(state) {
			state.isAddCart = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchListCart.fulfilled, (state, action) => {
			state.listCart = action.payload;
		});
		builder.addCase(addToCart.fulfilled, (state, action) => {
			state.isAddCart = true;
		});
		builder.addCase(updateProductCart.fulfilled, (state, action) => {
			state.updateCart = action.payload;
			state.isAddCart = true;
		});
		builder.addCase(deteleProductCart.fulfilled, (state, action) => {
			state.isAddCart = true;
		});
	},
});

// Export hành động và reducer
export const { resetFetchListCart } = cartSlice.actions;
export default cartSlice.reducer;
