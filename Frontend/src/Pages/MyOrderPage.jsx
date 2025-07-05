import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../Redux/slice/orderSlice';

export const MyOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {orders, loading, error} = useSelector((state) => state.orders);

  useEffect(()=> {
    dispatch(fetchUserOrders());
  }, [dispatch]);


  const handleOrderDetails = (orderId) =>{
    navigate(`/order/${orderId}`);
  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className='max-w-full mx-auto p-4 sm:px-6'>
      <h1 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h1>
      <div className='relative shadow-md md:rounded-lg overflow-auto'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3'>Image</th>
              <th className='py-2 px-4 sm:py-3'>Order ID</th>
              <th className='py-2 px-4 sm:py-3'>Created</th>
              <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
              <th className='py-2 px-4 sm:py-3'>Items</th>
              <th className='py-2 px-4 sm:py-3'>Price</th>
              <th className='py-2 px-4 sm:py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr 
                onClick={() => handleOrderDetails(order._id)}
                key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                    />
                  </td>
                  <td className='py-2 px-4 sm:py-4 font-semibold'>#{order._id}</td>
                  <td className='py-2 px-4 sm:py-4'>{order.createdAt}</td>
                  <td className='py-2 px-4 sm:py-4'>
                    {order.shippingAddress.city}, {order.shippingAddress.country}
                  </td>
                  <td className='py-2 px-4 sm:py-4'>{order.orderItems[0].name}</td>
                  <td className='py-2 px-4 sm:py-4'>${order.totalPrice}</td>
                  <td className='py-2 px-4 sm:py-4'>
                    {order.isPaid ? (
                      <span className='text-green-600 font-medium'>Paid</span>
                    ) : (
                      <span className='text-red-600 font-medium'>Pending</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='text-center px-4 py-4'>
                  You don't have any orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
