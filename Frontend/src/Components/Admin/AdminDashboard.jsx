import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllproducts } from '../../Redux/slice/adminProductSlice';
import { adminOrders } from '../../Redux/slice/adminOrderSlice';

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);
  const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllproducts());
    dispatch(adminOrders());
  }, [dispatch]);

  // console.log(orders);
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4 translate-x-6 -translate-y-4 md:translate-x-0'>Admin Dashboard</h1>
      {productsLoading || ordersLoading ? (
        <p>Loading ...</p>
      ) : productsError ? (
        <p className='text-red-600'>Error Fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className='text-red-600'>Error Fetching orders: {ordersError}</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-8'>
          <div className='p-4 flex flex-col border shadow-lg rounded'>
            <h3 className='text-2xl font-normal'>Revenue</h3>
            <span className='text-2xl font-semibold mt-4'>${totalSales ? totalSales.toFixed(2) : '0.00'}</span>
          </div>

          <div className='p-4 flex flex-col border shadow-lg rounded'>
            <h3 className='text-2xl font-normal'>Total Orders</h3>
            <span className='text-md font-semibold'>{totalOrders || 0}</span>
            <div className='mt-4'>
              <button className='text-blue-600 hover:underline text-sm'>&larr; Manage Orders</button>
            </div>
          </div>

          <div className='p-4 flex flex-col border shadow-lg rounded'>
            <h3 className='text-2xl font-normal'>Total Products</h3>
            <span className='text-md font-semibold'>{products ? products.length : 0}</span>
            <div className='mt-4'>
              <button className='text-blue-600 hover:underline text-sm'>&larr; Manage Products</button>
            </div>
          </div>
        </div>
      )}

      <h1 className='text-2xl font-bold px-2 md:px-0'>Recent Orders</h1>

      <div className='relative shadow-md md:rounded-lg overflow-auto mt-4'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3'>ORDER ID</th>
              <th className='py-2 px-4 sm:py-3'>USER</th>
              <th className='py-2 px-4 sm:py-3'>TOTAL PRICE</th>
              <th className='py-2 px-4 sm:py-3'>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                  <td className='py-2 px-4 sm:py-4 font-semibold'>{order._id}</td>
                  <td className='py-2 px-4 sm:py-4'>{order.user?.name || 'N/A'}</td>
                  <td className='py-2 px-4 sm:py-4'>${order.totalPrice?.toFixed(2) || '0.00'}</td>
                  <td className='py-2 px-4 sm:py-4'>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='text-center px-4 py-4'>
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