// ✅ Fixed `adminOrderSlice.js`
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Orders
export const adminOrders = createAsyncThunk(
  "admin/adminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data; // expects array of orders
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Order Status
export const adminOrderUpdate = createAsyncThunk(
  "admin/adminOrderUpdate",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State
const initialState = {
  orders: [],
  loading: false,
  error: null,
  totalOrders: 0,
  totalSales: 0,
};

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(adminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
      })
      .addCase(adminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order
      .addCase(adminOrderUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminOrderUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(adminOrderUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload.id);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;