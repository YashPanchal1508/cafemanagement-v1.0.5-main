import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    data: [],
    pagination: {
      finalTotal: 0,
      totalPages: 1,
      currentPage: 1,
      rowsPerPage: 5,
    },
    categorylist: [],
  },
  reducers: {
    addMenu: (state, action) => {
      const { data, pagination } = action.payload;
      state.data = data;
      state.pagination.finalTotal = pagination.count;
      state.pagination.totalPages = pagination.totalPages;
      state.pagination.currentPage = pagination.currentPage;
    },
    setCategorylist: (state, action) => {
      state.categorylist = action.payload

    },
    setCurrentPage(state, action) {
      console.log(action.payload);
      state.pagination.currentPage = action.payload;
    },
    setRowsPerPage(state, action) {
      state.pagination.rowsPerPage = action.payload;
    },
    searchMenu: (state, action) => {
      const {result} = action.payload
      state.data = result
    }
  }
})
export const { addMenu, setCategorylist,setCurrentPage ,setRowsPerPage,searchMenu} = menuSlice.actions
export default menuSlice.reducer;