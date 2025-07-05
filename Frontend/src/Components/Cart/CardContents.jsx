import { RiDeleteBin4Line } from "react-icons/ri";
import { removeFromCart, updateCartItemQuantity } from '../../Redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

const CardContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    // Handle adding or subtracting from cart
    const handleAddToCartQuantity = (productId, delta, quantity, color, size) => {
        const newQuantity = quantity + delta;
        if (newQuantity < 1) return; // prevent quantity less than 1

        dispatch(updateCartItemQuantity({
            productId, quantity: newQuantity, color, size, guestId, userId
        }));
    };

    const removeItemFromCart = (productId, quantity, color, size) => {
        dispatch(removeFromCart({
            productId, quantity, color, size, guestId, userId
        }));
    };
    
    return (
        <div>
            {cart.products.map((product) => (
                <div 
                    key={`${product.productId}-${product.size}-${product.color}`} 
                    className='mb-2 flex justify-between'
                >
                    <div className='flex justify-between'>
                        <div>
                            <img src={product.image} alt={product.name} className='h-24 w-20 object-cover rounded-md' />
                        </div>

                        <div className='flex flex-col ml-5 justify-center'>
                            <h3 className='text-lg'>{product.name}</h3>
                            <p className='text-sm text-gray-700'>
                                Size: {product.size} | Color: {product.color}
                            </p>

                            <div className='flex space-x-2 items-center mt-2'>
                                <button
                                    onClick={() => handleAddToCartQuantity(product.productId, -1, product.quantity, product.color, product.size)}
                                    className="border border-gray-700 px-3 py-1 text-sm"
                                >
                                    -
                                </button>

                                <div className="text-sm font-medium">
                                    {product.quantity}
                                </div>

                                <button
                                    onClick={() => handleAddToCartQuantity(product.productId, 1, product.quantity, product.color, product.size)}
                                    className="border border-gray-700 px-3 py-1 text-sm"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center mr-6 justify-between'>
                        <div className="text-md font-semibold">
                            ${product.price}
                        </div>
                        <button onClick={() => removeItemFromCart(product.productId, product.quantity, product.color, product.size)}>
                            <RiDeleteBin4Line className='text-red-600 h-6 w-6' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardContents;
