import React, { useEffect, useState } from "react";
import axios from "axios";
import { onLogout } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { Link, replace, useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [creditData, setCreditData] = useState({
    type: "",
    amount: "",
    purpose: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://content-craft-server-696839166197.us-central1.run.app/api/admin/users",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onClickLogout = () => {
    dispatch(onLogout());
    localStorage.removeItem("token");
    navigate("/auth/login", replace);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setCreditData({ type: "", amount: "", purpose: "" });
    setShowModal(true);
  };

  const handleCreditSubmit = async () => {
    const token = localStorage.getItem("token");
    const { type, amount, purpose } = creditData;

    if (!type || !amount || !purpose) return alert("All fields are required");

    try {
      await axios.put(
        `https://content-craft-server-696839166197.us-central1.run.app/api/admin/users/${selectedUser._id}/credits`,
        { type, amount, purpose },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update credits:", err);
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://content-craft-server-696839166197.us-central1.run.app/api/admin/users/${userId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <div className="flex gap-4 items-center">
          <Link
            className="text-blue-600 underline text-sm sm:text-base"
            to="/admin/reports"
          >
            Reports
          </Link>
          <button
            className="bg-blue-500 rounded text-white px-4 py-1 text-sm sm:text-base"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="w-full table-auto border text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Username</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Credits</th>
              <th className="border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{user.username}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2">{user.credits}</td>
                <td className="border px-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="bg-green-600 text-white text-xs sm:text-sm px-2 py-1 rounded"
                      onClick={() => openModal(user)}
                    >
                      Change Credits
                    </button>
                    <button
                      className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Change Credits for {selectedUser?.username}
            </h2>

            <div className="space-y-3">
              <select
                className="w-full border px-3 py-2"
                value={creditData.type}
                onChange={(e) =>
                  setCreditData({ ...creditData, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="add">Add</option>
                <option value="remove">Remove</option>
              </select>

              <input
                type="number"
                className="w-full border px-3 py-2"
                placeholder="Credit Amount"
                value={creditData.amount}
                onChange={(e) =>
                  setCreditData({ ...creditData, amount: e.target.value })
                }
              />

              <input
                type="text"
                className="w-full border px-3 py-2"
                placeholder="Purpose"
                value={creditData.purpose}
                onChange={(e) =>
                  setCreditData({ ...creditData, purpose: e.target.value })
                }
              />

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreditSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
