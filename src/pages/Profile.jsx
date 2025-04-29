import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onUpdate } from "../store/userSlice";

const Profile = () => {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userDetails?.username || "",
    email: userDetails?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.put(
        "https://content-craft-server-696839166197.us-central1.run.app/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(onUpdate(res.data.user));
      setMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to update profile.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Profile
        </h1>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">{message}</p>
        )}

        {!isEditing ? (
          <>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Username</p>
                <p className="font-semibold text-gray-900">
                  {userDetails?.username}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold text-gray-900">
                  {userDetails?.email}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {userDetails?.role}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Credits</p>
                <p className="font-semibold text-green-600">
                  {userDetails?.credits ?? 0}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
