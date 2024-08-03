import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkcoutReview = createAsyncThunk(
	"checkout/checkcoutReview",
	async (payload, thunkAPI) => {},
);

const initialState: {} = {};

// Slice quản lý xác thực
export const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

// Export hành động và reducer
export const {} = checkoutSlice.actions;
export default checkoutSlice.reducer;
