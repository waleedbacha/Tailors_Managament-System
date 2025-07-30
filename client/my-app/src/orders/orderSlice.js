import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base URL
const API_URL = 'http://localhost:3000/api/order';

// ✅ Async Thunks
export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createOrder = createAsyncThunk("order/createOrder", async (newOrder) => {
  const response = await axios.post(API_URL, newOrder);
  return response.data;
});

export const updateOrder = createAsyncThunk("order/updateOrder", async ({ id, updateData }) => {
  const response = await axios.put(`${API_URL}/${id}`, updateData);
  return response.data;
});

export const getOrderById = createAsyncThunk("order/getOrderById", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // we return the deleted ID to use in reducer
});

// ✅ Initial State
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// ✅ Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })

      // Update
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      // Get by ID
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })

      // Delete
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.orders = state.orders.filter((o) => o._id !== deletedId);
      });
  },
});

// ✅ Exports
export const { setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
