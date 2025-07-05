import { HiMiniXMark } from "react-icons/hi2";
import CardContents from '../Cart/CardContents';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const CartDrawer = ({ cartDrawerOpen, handleCartDrawerOpen }) => {
    const navigate = useNavigate();
    const {user, guestId} = useSelector((state) => state.auth);

    //console.log("cartdrawer" , user, guestId);
    const {cart} = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const handleCheckout = () => {
        handleCartDrawerOpen(); 
        if(!user){
            navigate("/login?redirect=/checkout");
        }
        else{
            navigate("/checkout");
        }
    }
    
    return (
        <div 
            className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50
            w-3/4 sm:w-1/2 lg:w-1/4 ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Close Button */}
            <div className="flex justify-end p-4">
                <button type="button" onClick={handleCartDrawerOpen}>
                    <HiMiniXMark className="text-gray-700 hover:text-black h-6 w-6 ml-2" />
                </button>
            </div>

            {/* Cart Content with Scrollable Area */}
            <div className='p-4 flex-grow overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                {cart && cart?.products?.length > 0 ? <CardContents cart={cart} userId={userId} guestId={guestId} /> : <p>Your Cart is empty.</p>}
            </div>

            {/* Checkout Section */}
            <div className='p-4 bg-white sticky bottom-0'>
                {cart && cart?.products?.length > 0 && (
                    <>
                     <button 
                        onClick={handleCheckout}
                        className='bg-black text-white text-xl font-semibold rounded-lg w-full py-2 hover:bg-gray-800 text-center'>
                            CheckOut
                        </button>
                        <p className="tracking-tighter text-sm text-gray-500 text-center mt-2">
                            Shipping, taxes, and discount codes calculated at Checkout
                        </p>   
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
