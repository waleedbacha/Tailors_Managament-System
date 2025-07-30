import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../orders/orderSlice'

export const store = configureStore({

    reducer: {orders: orderReducer, 

    },
})