import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch products based on collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    sizes,
    colors,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    materials,
    brands,
    limit
  }) => {
    const query = new URLSearchParams();

    if (collection) query.append("collection", collection);
    if (sizes) query.append("size", sizes);
    if (colors) query.append("color", colors);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (search) query.append("search", search);
    if (sortBy) query.append("sortBy", sortBy);
    if (materials) query.append("material", materials);
    if (brands) query.append("brand", brands);
    if (category) query.append("category", category);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/?${query.toString()}`
    );
    return response.data;
  }
);

// Async Thunk to fetch a single product by Id
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );

    //console.log(response.data);
    return response.data;
  }
);

// Async Thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// Async Thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      maxPrice: "",
      minPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilter: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        maxPrice: "",
        minPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products by filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single product
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;
