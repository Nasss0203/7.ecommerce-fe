import {
	actionPublishProduct,
	findAllDraftsForShop,
	findAllPublishForShop,
	unActionPublishProduct,
} from "@/api/product.api";
import { IProduct } from "@/types/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllDraftProduct = createAsyncThunk<IProduct[]>(
	"fetchAllDraftProduct",
	async () => {
		const response = await findAllDraftsForShop();
		const data = response?.metadata || [];
		return data;
	},
);

export const actionPublish = createAsyncThunk(
	"actionPublish",
	async (id: string, thunkAPI) => {
		const response = await actionPublishProduct(id);
		const data = response?.metadata || [];
		if (data === 1) {
			thunkAPI.dispatch(fetchAllDraftProduct());
		}
		return data;
	},
);

export const findAllPublishProduct = createAsyncThunk<IProduct[]>(
	"findAllPublishProduct",
	async () => {
		const response = await findAllPublishForShop();
		const data = response?.metadata || [];
		return data;
	},
);

export const actionUnPublish = createAsyncThunk(
	"actionUnPublish",
	async (payload: string, thunkAPI) => {
		const response = await unActionPublishProduct(payload);
		const data = response?.metadata || [];
		if (data === 1) {
			thunkAPI.dispatch(findAllPublishProduct());
		}
		return data;
	},
);

const initialState: {
	listProduct: IProduct[];
	isPublish: boolean;
	isUnPublish: boolean;
} = {
	listProduct: [],
	isPublish: false,
	isUnPublish: false,
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		resetFetchDraft(state) {
			state.isPublish = false;
		},
		resetFetchPublish(state) {
			state.isUnPublish = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllDraftProduct.fulfilled, (state, action) => {
				state.listProduct = action.payload;
			})
			.addCase(findAllPublishProduct.fulfilled, (state, action) => {
				state.listProduct = action.payload;
			})
			.addCase(actionPublish.fulfilled, (state, action) => {
				state.isPublish = true;
			})
			.addCase(actionUnPublish.fulfilled, (state, action) => {
				state.isUnPublish = true;
			});
	},
});
// Action creators are generated for each case reducer function
export const { resetFetchDraft, resetFetchPublish } = productSlice.actions;

export default productSlice.reducer;
