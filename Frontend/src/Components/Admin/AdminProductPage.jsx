import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllproducts, deleteProduct } from '../../Redux/slice/adminProductSlice';

export const AdminProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditForm = (_id) => {
    navigate(`/Admin/products/${_id}/edit`);
  };

  const {products , loading, error} = useSelector((state) => state.adminProducts);
  
  useEffect(()=>{
    dispatch(fetchAllproducts());
  }, [dispatch])

  const handleDelete = (productName, id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${productName}"?`);
    if (confirmDelete) {
      dispatch(deleteProduct({ id }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="p-8 min-h-screen bg-gray-50 hover:cursor-pointer">
      <h2 className="text-2xl font-bold mb-4  translate-x-6 -translate-y-4 md:translate-x-0">
        Product Management
      </h2>

      <div className="overflow-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b text-gray-600 text-left">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">SKU</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditForm(product._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-1 px-3 rounded shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.name, product._id)} 
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded shadow-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500 italic">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
