import { useDispatch, useSelector } from "react-redux";
import { MyOrderPage } from "./MyOrderPage";
import { logout } from "../Redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/slice/cartSlice";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state)=>state.auth);

  useEffect(()=>{
    if(!user){
      navigate("/login/?redirect=/profile");
    }
  },[user, navigate]);

  const handleLogout = () =>  {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-lg text-gray-600 mb-4 overflow-auto">{user?.email}</p>
            <button 
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Right Section: Orders Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrderPage/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
