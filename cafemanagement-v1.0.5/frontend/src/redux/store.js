import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice'
import menuReducer from './menuSlice'
import orderReducer from './orderSlice';
export const store = configureStore({
    reducer: {
        category: categoryReducer,
        menu: menuReducer,
        order: orderReducer
    }
});