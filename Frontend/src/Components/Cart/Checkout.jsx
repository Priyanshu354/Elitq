import { useNavigate } from 'react-router-dom';
import { PaypalButton } from './PaypalButton';
import { OrderSummary } from './OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { createCheckout } from '../../Redux/slice/checkoutSlice';
import axios from 'axios';

export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state)=>state.auth);

  const [checkoutId, SetCheckoutId] = useState(null);
  const [shippingAddress, SetShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleShippingAddress = (e) => {
    const { name, value } = e.target;
    SetShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleCreateCheckout = async(e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
    const res = await dispatch(createCheckout({
      CheckoutItems : cart?.products,
      shippingAddress,
      paymentMethod : "Paypal",
      totalPrice: cart.totalPrice,
    }));
    if(res.payload && res.payload._id){
      //console.log("checkout payload", res.payload);
      SetCheckoutId(res.payload._id);
    }
  };

  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails : details },
        { headers : {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        },
        }
        );

        await handleFanalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFanalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {}, 
        {
          headers : { 
            Authorization : `Bearer ${localStorage.getItem("userToken")}`,
          }
        },
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart ...</p>;
  if (error) return <p>{error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-4 tracking-tighter">
      {/* Left Content */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">CHECKOUT</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-md mb-1 font-semibold">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-md mb-4 mt-6 font-semibold">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700" htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.firstName}
                onChange={handleShippingAddress}
              />
            </div>

            <div>
              <label className="block text-gray-700" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.lastName}
                onChange={handleShippingAddress}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700" htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.address}
                onChange={handleShippingAddress}
              />
            </div>

            <div>
              <label className="block text-gray-700" htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.city}
                onChange={handleShippingAddress}
              />
            </div>

            <div>
              <label className="block text-gray-700" htmlFor="postalCode">Postal Code</label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.postalCode}
                onChange={handleShippingAddress}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700" htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.country}
                onChange={handleShippingAddress}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700" htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="w-full p-2 border rounded focus:outline-blue-500"
                required
                value={shippingAddress.phone}
                onChange={handleShippingAddress}
              />
            </div>
          </div>

          {!checkoutId ? (
            <button
              type="submit"
              className="w-full bg-black py-3 text-white text-lg rounded"
            >
              Continue to Payment
            </button>
          ) : (
            <div className="mt-6">
              <h3 className="text-lg mb-4">Pay With PayPal</h3>
              <PaypalButton
                amount={cart.totalPrice.toFixed(2)}
                onSuccess={handlePaymentSuccess}
                onError={(err) => {
                  console.error('Payment error:', err);
                  alert('Payment failed, try again');
                }}
              />
            </div>
          )}
        </form>
      </div>

      {/* Right Content */}
      <div className='bg-gray-50 p-6 rounded-lg flex flex-col'>
        <h2 className='text-md font-semibold'> Order Summary </h2>
        <div className="border-t border-gray-250 mt-6 mb-2"></div>
        {
          cart.products.map((item, index) => {
            return <OrderSummary key={index} product={item} />;
          })
        }

        <div className="border-t border-gray-250 mt-6 mb-2"></div>

        <div className='flex justify-between mt-2'>
          <h3 className='text-lg'> Subtotal </h3>
          <h3 className='text-lg font-serif'> ${cart.totalPrice.toFixed(2)} </h3>
        </div>

        <div className='flex justify-between mt-2'>
          <h3 className='text-lg'> Shipping </h3>
          <h3 className='text-lg'> Free </h3>
        </div>

        <div className="border-t border-gray-250 mt-4 mb-2"></div>

        <div className='flex justify-between'>
          <h3 className='font-medium text-lg'> Total </h3>
          <h3 className='text-lg font-serif'> ${cart.totalPrice.toFixed(2)} </h3>
        </div>
      </div>
    </div>
  );
};
