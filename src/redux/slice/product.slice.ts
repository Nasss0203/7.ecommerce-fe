import {
	actionPublishProduct,
	findAllDraftsForShop,
	findAllProducts,
	findAllPublishForShop,
	unActionPublishProduct,
} from "@/api/product.api";
import { IProduct, IResponse } from "@/types/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllDraftProduct = createAsyncThunk<IProduct[]>(
	"product/fetchAllDraftProduct",
	async () => {
		const response = await findAllDraftsForShop();
		const data = response?.metadata || [];
		return data;
	},
);

export const fetchFindAllProduct = createAsyncThunk<IProduct[]>(
	"product/fetchFindAllProduct",
	async () => {
		const response = await findAllProducts();
		const data = response?.metadata || [];
		return data;
	},
);

export const actionPublish = createAsyncThunk(
	"product/actionPublish",
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
	"product/findAllPublishProduct",
	async () => {
		const response = await findAllPublishForShop();
		const data = response?.metadata || [];
		return data;
	},
);

export const actionUnPublish = createAsyncThunk(
	"product/actionUnPublish",
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
	listProductAll: IResponse<IProduct[]>;
	isPublish: boolean;
	isUnPublish: boolean;
	isLoading: boolean;
	isSkeletonLoading: boolean;
} = {
	listProduct: [],
	listProductAll: {},
	isPublish: false,
	isUnPublish: false,
	isLoading: false,
	isSkeletonLoading: true,
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
		actionFetchAllProduct(state) {
			state.isLoading = false;
			state.isSkeletonLoading = true;
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
		builder
			.addCase(fetchFindAllProduct.pending, (state, action) => {
				state.isLoading = true;
				state.isSkeletonLoading = true;
			})
			.addCase(fetchFindAllProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSkeletonLoading = false;
				state.listProductAll.data = action.payload;
			})
			.addCase(fetchFindAllProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isSkeletonLoading = true;
			});
	},
});
// Action creators are generated for each case reducer function
export const { resetFetchDraft, resetFetchPublish, actionFetchAllProduct } =
	productSlice.actions;

export default productSlice.reducer;
