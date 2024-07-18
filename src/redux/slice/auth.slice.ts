import { logout, register, signIn } from "@/api/auth.api";
import { IAuth } from "@/types/data";
import { isAuthenticated } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authRegister = createAsyncThunk(
	"auth/authRegister",
	async (payload: IAuth, thunkAPI) => {
		const response = await register({ ...payload });
		const data = response?.metadata;
		return data;
	},
);

export const authLogin = createAsyncThunk(
	"auth/authLogin",
	async (payload: IAuth, thunkAPI) => {
		const response = await signIn({ ...payload });
		const data = response?.metadata;
		localStorage.setItem("auth", JSON.stringify(data));
		return data;
	},
);

export const authLogout = createAsyncThunk("auth/logout", async () => {
	const response = await logout();
	const data = response?.metadata;
	if (data) {
		localStorage.removeItem("auth");
	}
	return data;
});

const initialState = {
	isAuthenticated: isAuthenticated() !== null,
	isLoading: false,
	auth: isAuthenticated() || {
		_id: "",
		name: "",
		email: "",
	},
};

// Slice quản lý xác thực
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: (state) => {
			localStorage.removeItem("auth");
			state.isAuthenticated = false;
			state.auth = { _id: "", name: "", email: "" };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authLogin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authLogin.fulfilled, (state, action) => {
				state.auth = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
			})
			.addCase(authLogin.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(authRegister.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(authRegister.fulfilled, (state, action) => {
				state.auth = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
			})
			.addCase(authRegister.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

// Export hành động và reducer
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
