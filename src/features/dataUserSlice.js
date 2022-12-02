import { createSlice } from "@reduxjs/toolkit";
const name = 'dataUser';
const load = JSON.parse(localStorage.getItem(name));
const initialState = {
    halaman: name,
    data: [],
    total: 0,
    page: load ? load.page : 1,
    pageSize: load ? load.pageSize : 3,
    totalPage: 0,
    sortModel: [{
        field: load.sort_field ? load.sort_field : 'id',
        sort: load.sort_direction ? load.sort_direction : 'desc'
    }]
}

const dataUserSlice = createSlice({
    name: name,
    initialState,
    reducers: {
        reset: (state) => initialState,
        
    }
});

export const { reset, setNotification } = dataUserSlice.actions;
export default dataUserSlice.reducer;