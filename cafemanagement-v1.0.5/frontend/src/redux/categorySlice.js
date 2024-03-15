// categorySlice.js

import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        pagination: {
            finalTotal: 0,
            totalPages: 1,
            currentPage: 1,
            rowsPerPage: 5,
    },
},
    reducers: {
        setCurrentPage(state, action) {
            console.log(action.payload);
            state.pagination.currentPage = action.payload;
          },
          setRowsPerPage(state, action) {
            state.pagination.rowsPerPage = action.payload;
          },
          addCategorySlice: (state, action) => {
            const { data, pagination } = action.payload;

            // Calculate the index where the new data should be added based on pagination
            state.data =  data
        
            state.pagination.finalTotal =pagination.totalCount;
            state.pagination.totalPages = pagination.totalPages;
            state.pagination.currentPage = pagination.currentPage;
        },
        
        
        deleteCategorySlice: (state, action) => {
            const { data, pagination } = action.payload;
            // console.log(name)
            state.data = data
            state.pagination.finalTotal = pagination.totalCount;
            state.pagination.totalPages = pagination.totalPages;
            state.pagination.currentPage = pagination.currentPage;
        },
        getCategorySlice: (state, action) => {
            const { data, pagination} = action.payload;
            state.data = data;
            state.pagination.finalTotal = pagination.totalCount;
            state.pagination.totalPages = pagination.totalPages;
            state.pagination.currentPage = pagination.currentPage;
        }
    }
});

export const { addCategorySlice, deleteCategorySlice, getCategorySlice,setCurrentPage,setRowsPerPage } = categorySlice.actions;
export default categorySlice.reducer;
