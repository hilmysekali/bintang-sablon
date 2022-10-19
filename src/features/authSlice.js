import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { admin_produksi_router, customer_service_router, desainer_router, owner_router, root_router } from "../config/router";
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    menuList: {},
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await api().post('/api/login', {
            username: user.username,
            password: user.password
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await api().get('/api/user');
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await api().post('/api/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload.name));
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload.name));
            if (action.payload.role === 'root') {
                state.menuList = root_router;
            }
            if (action.payload.role === 'customer_service') {
                state.menuList = customer_service_router;
            }
            if (action.payload.role === 'desainer') {
                state.menuList = desainer_router;
            }
            if (action.payload.role === 'admin_produksi') {
                state.menuList = admin_produksi_router;
            }
            if (action.payload.role === 'owner') {
                state.menuList = owner_router;
            }
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            localStorage.removeItem('user');
            state.message = action.payload;
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;