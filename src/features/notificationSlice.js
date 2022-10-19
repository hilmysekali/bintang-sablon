import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: ""
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setNotification: (state, action) => {
            state.snackbarOpen = action.payload.snackbarOpen;
            state.snackbarType = action.payload.snackbarType;
            state.snackbarMessage = action.payload.snackbarMessage;
        },
    }
});

export const { reset, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;