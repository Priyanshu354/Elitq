import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "./ProductGrid";
import { fetchProductDetails } from "../../Redux/slice/productSlie";
import { fetchSimilarProducts } from "../../Redux/slice/productSlie";
import { addToCart } from "../../Redux/slice/cartSlice";
import { toast } from 'sonner';

function AnyComponent() {
  return (
    <button onClick={() => toast('Hello world!')}>
      Show Toast
    </button>
  );
}


const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct: product, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDisableCartButton, setIsDisableCartButton] = useState(false);
  const [isMinusBlinking, setIsMinusBlinking] = useState(false);
  const [isPlusBlinking, setIsPlusBlinking] = useState(false);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

  const handleQuantity = (action) => {
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setIsMinusBlinking(true);
      setTimeout(() => setIsMinusBlinking(false), 150);
    } else if (action === "plus") {
      setQuantity((prev) => prev + 1);
      setIsPlusBlinking(true);
      setTimeout(() => setIsPlusBlinking(false), 150);
    }
  };

  const handleSelectedColor = (color) => {
    setSelectedColor(color);
  };

  const handleSelectedSize = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      //console.log("fuck you baby");
      toast.error("Please Select Size & Color", { duration: 1000 });
      return;
    }

    setIsDisableCartButton(true);

    dispatch(addToCart({
        productId: productFetchId,
        size: selectedSize,
        color: selectedColor,
        quantity,
        userId: user?._id,
        guestId,
    }))
    .then(() => {
    toast.success("Product added to cart!", { duration: 1000 });
    })
    .finally(() => {
    setIsDisableCartButton(false);
    });
  };

  if (loading || !product) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center p-4 flex-col">
      <div className="flex gap-8 justify-center p-4">
        {/* Desktop Thumbnails */}
        <div className="hidden lg:flex lg:flex-col">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText}
              onClick={() => setMainImage(image.url)}
              className={`w-20 h-20 mb-4 rounded-lg object-cover cursor-pointer ${
                mainImage === image.url ? "border-4 border-gray-500" : "border border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div>
          <img
            src={mainImage}
            alt={product.images[0]?.altText || "Product Image"}
            className="w-full h-auto object-cover rounded-lg shadow-sm shadow-black"
          />

          {/* Medium Device Thumbnails */}
          <div className="hidden sm:flex gap-2 mt-2 lg:hidden">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                onClick={() => setMainImage(image.url)}
                className={`w-20 h-20 mb-4 rounded-lg object-cover cursor-pointer ${
                  mainImage === image.url ? "border-4 border-gray-500" : "border border-transparent"
                }`}
              />
            ))}
          </div>

          {/* Mobile Device Thumbnails */}
          <div className="flex flex-col sm:hidden mt-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                onClick={() => setMainImage(image.url)}
                className={`w-20 h-20 mb-4 rounded-lg object-cover cursor-pointer ${
                  mainImage === image.url ? "border-4 border-gray-500" : "border border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold text-black">{product.name}</h2>
          <p className="text-sm line-through text-gray-600 mt-2">${product.originalPrice}</p>
          <span className="text-lg font-semibold text-black">${product.price}</span>
          <p className="text-sm text-gray-700 max-w-[400px]">{product.description}</p>

          {/* Color Selection */}
          <div className="flex flex-col gap-2 mt-2">
            <h2 className="text-md font-semibold">Color:</h2>
            <div className="flex gap-4 items-center -ml-1">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectedColor(color)}
                  className={`rounded-full w-8 h-8 border ${
                    color === selectedColor ? "border-4 border-gray-500" : "border border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-2 mt-2">
            <h2 className="text-md font-semibold">Size:</h2>
            <div className="flex gap-4 items-center">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectedSize(size)}
                  className={`border border-gray-700 px-3 py-1 text-sm rounded-sm ${
                    size === selectedSize ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="flex mt-2 flex-col">
            <h2 className="text-md font-semibold">Quantity:</h2>
            <div className="flex gap-4 items-center mt-2">
              <button
                onClick={() => handleQuantity("minus")}
                className={`border border-gray-700 px-3 py-1 text-sm ${
                  isMinusBlinking ? "bg-black text-white" : "bg-white"
                }`}
              >
                -
              </button>
              <div className="text-sm font-medium">{quantity}</div>
              <button
                onClick={() => handleQuantity("plus")}
                className={`border border-gray-700 px-3 py-1 text-sm ${
                  isPlusBlinking ? "bg-black text-white" : "bg-white"
                }`}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-2">
            <button
              onClick={handleAddToCart}
              className={`bg-black text-white text-md font-semibold rounded-md w-full py-2 text-center ${
                isDisableCartButton ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
              disabled={isDisableCartButton}
            >
              {isDisableCartButton ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          {/* Product Characteristics */}
          <div className="mt-2">
            <h2 className="text-md font-semibold text-black mb-2">Characteristics</h2>
            <table className="w-full border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="text-sm text-gray-700 p-2 font-medium">Brand</td>
                  <td className="text-sm text-gray-700 p-2">{product.brand}</td>
                </tr>
                <tr>
                  <td className="text-sm text-gray-700 p-2 font-medium">Material</td>
                  <td className="text-sm text-gray-700 p-2">{product.material || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-20 w-[80%] mx-auto">
        <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
        <ProductGrid products={similarProducts} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default ProductDetails;
