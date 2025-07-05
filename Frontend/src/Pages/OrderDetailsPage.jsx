import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../Redux/slice/orderSlice';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orderDetails, loading, error} = useSelector((state) => state.orders);

  //console.log(orderDetails);
  useEffect(() => {
    dispatch(fetchOrderDetails({ orderId: id }));
  }, [dispatch, id]);

  const handleOrderPage = () => {
    navigate("/profile");
  };

  if (!orderDetails) return <div className="text-center py-10">Loading...</div>;

  const formattedDate = new Date(orderDetails.createdAt).toLocaleDateString();

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order Details</h2>

      <div className="border rounded-md p-6 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-lg">Order ID: #{orderDetails._id}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex gap-2">
            {orderDetails.isPaid && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                Approved
              </span>
            )}
            {!orderDetails.isDelivered && (
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded">
                Pending
              </span>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
          {/* Payment Info */}
          <div>
            <h4 className="font-semibold mb-1">Payment Info</h4>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? 'Paid' : 'Not Paid'}</p>
          </div>

          {/* Shipping Info */}
          <div>
            <h4 className="font-semibold mb-1">Shipping Info</h4>
            <p>Shipping Method: {orderDetails.shippingMethod}</p>
            <p>
              Address: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Product Table */}
        <div>
          <h4 className="font-semibold mb-2">Products</h4>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="p-2 font-medium">Name</th>
                <th className="p-2 font-medium">Unit Price</th>
                <th className="p-2 font-medium">Quantity</th>
                <th className="p-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="flex items-center gap-2 p-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded" />
                    {item.name}
                  </td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Link */}
        <div className="mt-4">
          <button onClick={handleOrderPage} className="text-blue-600 hover:underline text-sm">&larr; Back to My Orders</button>
        </div>
      </div>
    </div>
  );
};
