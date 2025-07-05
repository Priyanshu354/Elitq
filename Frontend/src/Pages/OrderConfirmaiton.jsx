import React, { useEffect } from 'react';
import { OrderSummary } from '../Components/Cart/OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../Redux/slice/cartSlice';

export const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout, loading } = useSelector((state) => state.checkout);

  //console.log(checkout);

  useEffect(() => {
    if (!loading) {
      if (checkout && checkout._id) {
        //console.log("dispatched clear cart");
        dispatch(clearCart());
        localStorage.removeItem("cart");
      } else {
        navigate("/my-orders");
      }
    }
  }, [checkout, dispatch, navigate, loading]);

  const estimatedDeliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();
  const shippingAddress = checkout?.shippingAddress;

  return (
    <div className="mx-auto container w-full m-6">
      <h1 className="font-semibold text-green-700 text-5xl text-center">
        Thank You For Your Order!
      </h1>
      
      {checkout && (
        <div className="md:w-1/2 w-full mx-auto border rounded-lg p-6 mt-6 flex flex-col gap-14">
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">
                Ordered Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </h3>
            </div>
            <p className="text-green-600 font-bold">Estimated Delivery: {estimatedDeliveryDate}</p>
          </div>

          <div>
            {checkout.checkOutItem.map((item, index) => {
              return <OrderSummary key={index} product={item} />
            })}
          </div>

          <div className='grid grid-cols-2 gap-y-2'>
            <h2 className='text-lg font-semibold'> Payment </h2>
            <h2 className='text-lg font-semibold'> Delivery </h2>
            <p className='text-md'> PayPal </p>
            <p className='text-md'>
              {shippingAddress?.address}, {shippingAddress?.city}, {shippingAddress?.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
