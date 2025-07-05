import React, { useState } from 'react';
import { FaUsers, FaBoxOpen, FaClipboardList, FaStore } from "react-icons/fa";
import { IoExit, IoMenu } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { NavLink,useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/slice/authSlice';

const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("cart");
    navigate("/");
  }
  
  const handleAdminHomePage = () =>{
    navigate('/Admin');
    closeSidebar();
  }
  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-3xl text-gray-700">
            <IoMenu />
        </button>
    </div>


      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="px-6 py-6">
          <h1 className='text-3xl font-bold text-white'>Elitiq</h1>
          <h2 onClick={handleAdminHomePage}
          className='text-lg font-semibold text-white mt-6 mb-4'>Admin Dashboard</h2>

          <div className="flex flex-col space-y-4">
            <NavLink to="/Admin/users" onClick={closeSidebar} className="flex items-center space-x-3 text-gray-400 hover:text-white">
              <FaUsers className="text-lg" />
              <span>Users</span>
            </NavLink>

            <NavLink to="/Admin/products" onClick={closeSidebar} className="flex items-center space-x-3 text-gray-400 hover:text-white">
              <FaBoxOpen className="text-lg" />
              <span>Products</span>
            </NavLink>

            <NavLink to="/Admin/orders" onClick={closeSidebar} className="flex items-center space-x-3 text-gray-400 hover:text-white">
              <FaClipboardList className="text-lg" />
              <span>Orders</span>
            </NavLink>

            <NavLink to="/" onClick={closeSidebar} className="flex items-center space-x-3 text-gray-400 hover:text-white">
              <FaStore className="text-lg" />
              <span>Shop</span>
            </NavLink>

            <button 
              className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 mt-4 flex items-center justify-center gap-2"
              onClick={() => {
                handleLogOut();
              }}
            >
              <IoExit className='text-lg' />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
