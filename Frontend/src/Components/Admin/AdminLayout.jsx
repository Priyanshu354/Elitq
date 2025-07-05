import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBoxOpen } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { IoExit } from "react-icons/io5";
import MobileSideBar from './MobileSideBar';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../Redux/slice/cartSlice';
import { logout } from '../../Redux/slice/authSlice';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminHomePage = () =>{
    navigate('/Admin');
  }

  const handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("cart");
  }
  return (
    <div className='w-full h-screen flex'>
      {/* Side bar */}
      <div className='h-full md:w-64 hidden md:flex bg-gray-900 flex-col'>
        <h1 onClick={
            () => {
            navigate('/')
        }}
        className='text-3xl font-bold text-white px-6 tracking-wide pt-6'>Elitiq</h1>
        <div className='px-8 flex flex-col mt-6'>
          <h2 onClick={handleAdminHomePage}
          className='text-lg font-semibold text-white mb-4'>Admin Dashboard</h2>

          {/* Menu Items */}
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex items-center space-x-3">
              <FaUsers className='text-gray-400 text-lg hover:text-white' />
              <NavLink to="/Admin/users" className="text-gray-400 text-sm font-normal hover:text-white">Users</NavLink>
            </div>

            <div className="flex items-center space-x-3">
              <FaBoxOpen className='text-gray-400 text-lg hover:text-white' />
              <NavLink to="/Admin/products" className="text-gray-400 text-sm font-normal hover:text-white">Products</NavLink>
            </div>

            <div className="flex items-center space-x-3">
              <FaClipboardList  className='text-gray-400 text-lg hover:text-white' />
              <NavLink to="/Admin/orders" className="text-gray-400 text-sm font-normal hover:text-white">Orders</NavLink>
            </div>

            <div className="flex items-center space-x-3">
              <FaStore  className="text-gray-400 text-lg hover:text-white" />
              <NavLink to="/" className="text-gray-400 text-sm font-normal hover:text-white">Shop</NavLink>
            </div>
          </div>

          <button 
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 mt-6 flex items-center justify-center gap-2"
            onClick={() => handlelogout()}
          >
            <IoExit className='text-lg' />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Mobile side Bar */}
      <MobileSideBar />
    </div>
  )
}
