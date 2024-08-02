import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import cartReducer from "./slice/cart.slice";
import productReducer from "./slice/product.slice";

export const store = configureStore({
	reducer: {
		product: productReducer,
		auth: authReducer,
		cart: cartReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
