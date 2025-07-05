import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegisterImage from '../assets/register.webp';
import { registerUser } from '../Redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { mergeCart } from '../Redux/slice/cartSlice';

const Register = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state)=>state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  //Auto-navigate if already logged in
  useEffect(() => {
    if (user) {
      if(cart?.products.length > 0 && guestId){
        dispatch(mergeCart({guestId, user}))
        .then(() => {
          navigate(redirect);          
        })
      }
      else{
        navigate(redirect);
      }
    }
  }, [user, redirect, navigate, guestId, cart, dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name, email, password})).
    then(()=> {
      navigate(redirect);
    });
  }

  return (
    <div className="flex">
      {/* Register */}
      <div className="w-full md:w-1/2 px-8 md:px-12 flex justify-center items-center">
        <form className="w-[400px] md:w-[500px] bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Elitiq</h2>
          </div>

          <div className="flex justify-center mb-6">
            <h1 className="text-2xl font-bold">Hey There!👋</h1>
          </div>

          <div className="mb-6">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={(e) => SetName(e.target.value)}
              type="text"
              id="text"
              name="name"
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter your name"
              value={name}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              onChange={(e) => SetEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter your email"
              value={email}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => SetPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter your password"
              value={password}
            />
          </div>

          <button 
          onClick={handleSubmit}
          type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mb-6">
           {loading ? "Loading" : "Register"}
          </button>

          <div className="mb-6 flex justify-center">
            <p className="text-md font-semibold">Have an account?</p>
            <Link to='/login' className="ml-1 text-blue-700">Login</Link>
          </div>
        </form>
      </div>

      {/* Register Image */}
      <div className="hidden md:w-1/2 md:flex">
        <img src={RegisterImage} alt="Register Illustration" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Register;
