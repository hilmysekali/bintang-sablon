import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        loading: false,
        errorServer: false,
        drawerWidth: 240,
        drawerOpen: true
    },

    reducers: {
        updateDrawer: (state, action) => {
            state.drawerOpen = action.payload;
        },
        updateLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateErrorServer: (state, action) => {
            state.errorServer = action.payload;
        }
    }
});

export const { updateDrawer, updateLoading, updateErrorServer } = themeSlice.actions;
export default themeSlice.reducer;