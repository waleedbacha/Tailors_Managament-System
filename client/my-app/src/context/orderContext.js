import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";



const API_URL = 'http://localhost:3000/api/orders';



export const fetchOrders = createAsyncThunk("order/fetchOrder" , async() => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const createOrders = createAsyncThunk("order/createOrder" , async(newOrder)=> {
    const response = await axios.post(API_URL ,newOrder);
    return response.data
});

export const updateOrder = createAsyncThunk("order/updateOrder" , async({id , updateData})=> {
    const response = await axios.put(`API_URL/${id}` , updateData);
    return response.data
});

export const getOrderById = createAsyncThunk("order/updateOrder" , async(id)=> {
    const response = await axios.get(`API_URL/${id}`);
    return response.data
});

export const deleteOrder = createAsyncThunk("order/updateOrder" , async(id)=> {
    const response = await axios.delete(`API_URL/${id}`);
    return response.data
});

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
    name : "orderSlice",
    initialState,
    reducers:{
        setCurrentOrder: (state , action) => {
        state.currentOrder = action.payload
        },
    },
    extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
        state.loading= true;
        state.error=null;
    })
    .addCase(fetchOrders.fulfilled , (state , actoin) => {
        state.loading = false;
        state.orders = actoin.payload;
    })
.addCase(fetchOrders.rejected , (state , action) => {
    state.loading = false;
    state.error = action.error.message;
})
.addCase(createOrders.fulfilled , (state , action) => {
    state.orders.push(action.payload);
})
.addCase(updateOrder.fulfilled , (state , action) => {
    const index = state.orders.findIndex((o) => o._id === action.payload._id);
    if (index !== -1) state.orders[index] = action.payload;

})
.addCase(getOrderById.fulfilled, (state ,action) => {
    state.currentOrder= action.payload;
})
.addCase(deleteOrder , (state , action) => {
state.orders = state.orders.filter((o) => o._id !== action.payload)
})
    }
});

export const { setCurrentOrder} =orderSlice.actions;
export default orderSlice.reducer;