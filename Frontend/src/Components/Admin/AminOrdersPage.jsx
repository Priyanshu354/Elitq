import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminOrderUpdate, adminOrders } from '../../Redux/slice/adminOrderSlice';

export const AminOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(adminOrders());
    }
  }, [dispatch, user, navigate]);

  const handleOrderChange = async (orderId, status) => {
    await dispatch(adminOrderUpdate({ id: orderId, status }));
    dispatch(adminOrders());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Order ID</th>
              <th className="text-left px-4 py-2 border-b">User ID</th>
              <th className="text-left px-4 py-2 border-b">Total Price</th>
              <th className="text-left px-4 py-2 border-b">Paid</th>
              <th className="text-left px-4 py-2 border-b">Delivered</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{order._id}</td>
              <td className="px-4 py-2 border-b">{order.user?.name || "N/A"}</td>
              <td className="px-4 py-2 border-b">${order.totalPrice?.toFixed(2)}</td>
              <td className="px-4 py-2 border-b">
                {order.isPaid ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </td>
              <td className="px-4 py-2 border-b">
                {order.isDelivered ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </td>
              <td className="px-4 py-2 border-b">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleOrderChange(order._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="px-4 py-2 border-b">
                {!order.isDelivered && (
                  <button
                    onClick={() => handleOrderChange(order._id, "Delivered")}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
         </tbody>

        </table>
      </div>
    </div>
  );
};
