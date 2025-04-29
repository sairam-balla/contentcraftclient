import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Saved = () => {
  const [saved, setSaved] = useState([]);

  const getSavedFeed = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://content-craft-server-696839166197.us-central1.run.app/api/feed/saved",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setSaved(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getSavedFeed();
  }, []);

  const removeSaved = async (feedId, userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `https://content-craft-server-696839166197.us-central1.run.app/api/feed/removeSaved/`,
        { feedId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Post removed successfully");
      getSavedFeed();
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Saved Posts
      </h1>

      {saved.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {post.content.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {post.content.selftext?.substring(0, 100)}...
              </p>
              <button
                type="button"
                onClick={() => removeSaved(post.feedId, post.userId)}
                className="bg-red-600 hover:bg-red-700 text-white rounded py-1 px-3 self-start"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-semibold italic text-gray-500">
            No Saved Posts
          </h1>
        </div>
      )}
    </div>
  );
};

export default Saved;
