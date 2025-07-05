import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './Components/Layout/UserLayout';
import Home from './Pages/Home';
import { Toaster } from 'sonner';
import Login from './Pages/Login'
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import { CollectionPage } from './Pages/CollectionPage';
import ProductDetalis from './Components/Products/ProductDetalis';
import { Checkout } from './Components/Cart/Checkout';
import { OrderConfirmation } from './Pages/OrderConfirmaiton';
import { OrderDetailsPage } from './Pages/OrderDetailsPage';
import { AdminLayout } from './Components/Admin/AdminLayout';
import { AdminDashboard } from './Components/Admin/AdminDashboard';
import { AdminUsers } from './Components/Admin/AdminUsers';
import { AdminProductPage } from './Components/Admin/AdminProductPage';
import { AminOrdersPage } from './Components/Admin/AminOrdersPage';
import AdminProductEditPage from './Pages/AdminProductEditPage';


import {Provider} from "react-redux";
import store from "./Redux/store"
import { MyOrderPage } from './Pages/MyOrderPage';
import ProtectedRoute from './Components/Common/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/collections/:collection" element={<CollectionPage/>}></Route>
          <Route path="/product/:id" element={<ProductDetalis/>} ></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/order-confirmation' element={<OrderConfirmation/>}></Route>
          <Route path="/order/:id" element={<OrderDetailsPage/>}></Route>
          <Route path="/my-orders" element={<MyOrderPage/>} />
        </Route>

        <Route path="/Admin" element={
          <ProtectedRoute role="admin"> 
          <AdminLayout/> 
          </ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="orders" element={<AminOrdersPage />} />
          <Route path="products/:id/edit" element={<AdminProductEditPage/>}></Route>
        </Route>


      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
