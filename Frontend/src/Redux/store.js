import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import productReducer from './slice/productSlie';
import cartReducer from './slice/cartSlice';
import checkoutReducer from './slice/checkoutSlice';
import orderReducer from './slice/orderSlice';
import adminReducer from './slice/adminSlice';
import adminProductReducer from './slice/adminProductSlice';
import adminOrdreReducer from './slice/adminOrderSlice';


const store = configureStore({
   reducer: {
      auth : authReducer,
      products: productReducer,
      cart: cartReducer,
      checkout: checkoutReducer,
      orders: orderReducer,
      admin: adminReducer,
      adminProducts : adminProductReducer,
      adminOrders : adminOrdreReducer,
   },
});

export default store;