import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../Redux/slice/productSlie';
import axios from 'axios';

const AdminProductEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    Collection: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      // console.log(id);
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    //console.log(selectedProduct);
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sizes" || name === "colors") {
      setProduct((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    try {
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/uploads`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        //console.log(data);
        setProduct((prev) => ({
          ...prev,
          images: [...prev.images, { url: data.url, altText: "" }],
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData : product }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Edit Product</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Product name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Product description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Stock Count</label>
          <input
            type="number"
            name="countInStock"
            value={product.countInStock}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Stock Count"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="SKU"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Sizes (Comma separated)</label>
          <input
            type="text"
            name="sizes"
            value={product.sizes.join(', ')}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="e.g. S, M, L, XL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Colors (Comma separated)</label>
          <input
            type="text"
            name="colors"
            value={product.colors.join(', ')}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="e.g. Red, Blue, Black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Product Images</label>
          {product.images.length > 0 ? (
            <div className="flex space-x-4 mb-4 overflow-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No images uploaded yet.</p>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full mt-6"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductEditPage;
