import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import cartReducer from "./slice/cart.slice";
import checkoutReducer from "./slice/checkout.slice";
import orderReducer from "./slice/order.slice";
import productReducer from "./slice/product.slice";

export const store = configureStore({
	reducer: {
		product: productReducer,
		auth: authReducer,
		cart: cartReducer,
		checkout: checkoutReducer,
		order: orderReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
