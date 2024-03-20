// menuSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [], // Assuming your initial data structure
    quantities: [], // Array to store quantities for each product
    orderList: [] // Array to store the list of ordered products
  },
  reducers: {
    setMenuData: (state, action) => {
      state.data = action.payload;
      state.quantities = new Array(action.payload.length).fill(0); // Initialize quantities array
    },
    addOrderList: (state, action) => {
      const productId = action.payload;
      const selectedProduct = state.data.find(product => product.productid === productId);
      const isProductInOrderList = state.orderList.some(product => product.productid === productId);
      if (!isProductInOrderList) {
        state.orderList.push(selectedProduct);
        state.quantities[state.data.findIndex(item => item.productid === productId)]++;
      }
    },
    removeFromOrder: (state, action) => {
      const productId = action.payload;
      state.orderList = state.orderList.filter(product => product.productid !== productId);
      state.quantities[state.data.findIndex(item => item.productid === productId)] = 0; // Reset quantity
    },
    increaseOrderQuantity: (state, action) => {
        const productId = action.payload;
        state.quantities[state.data.findIndex(item => item.productid === productId)]++;
      },
      decreaseOrderQuantity: (state, action) => {
        const productId = action.payload;
        if (state.quantities[state.data.findIndex(item => item.productid === productId)] > 0) {
          state.quantities[state.data.findIndex(item => item.productid === productId)]--;
        }
      },
  },
});

export const { setMenuData, addOrderList, removeFromOrder,increaseOrderQuantity,decreaseOrderQuantity } = orderSlice.actions;

// Other code like selectors, thunks, etc. if needed

export default orderSlice.reducer;
