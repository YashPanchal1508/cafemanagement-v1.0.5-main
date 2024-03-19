import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice'
import menuReducer from './menuSlice'
export const store = configureStore({
    reducer: {
        category: categoryReducer,
        menu: menuReducer,
    }
});