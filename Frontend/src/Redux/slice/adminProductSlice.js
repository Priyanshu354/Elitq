import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Products
export const fetchAllproducts = createAsyncThunk(
  "admin/fetchAllproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
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

// Create New Product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        productData,
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

// Update Existing Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        productData,
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

// Delete a Product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    // console.log("id" , id);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return { id }; // Returning the deleted product's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload.id);
      });
  },
});

export default adminProductSlice.reducer;
