import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../../Redux/slice/adminSlice';

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    if (user === null) return;
    if (user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllUsers());
    }
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUser({ userData: form })).unwrap();
      setForm({ name: '', email: '', password: '', role: '' });
      dispatch(fetchAllUsers());
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Error creating user: " + err.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const userToUpdate = users.find((u) => u._id === userId);
    if (!userToUpdate) return;

    try {
      await dispatch(updateUser({
        id: userId,
        name: userToUpdate.name,
        email: userToUpdate.email,
        role: newRole,
      })).unwrap();
      dispatch(fetchAllUsers());
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user: " + err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await dispatch(deleteUser({ id: userId })).unwrap();
      dispatch(fetchAllUsers());
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Error display */}
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      {/* Add New User Form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded p-2 w-40"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-2 w-56"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border rounded p-2 w-40"
            required
          />
        </div>
        <div className="relative w-32">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="appearance-none border rounded p-2 w-full pr-6"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add User
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">Loading...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">No users found.</td>
              </tr>
            ) : (
              users.map((u,index) => (
                <tr key={index} className="border-t text-sm">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border rounded p-1 text-sm"
                    >
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
