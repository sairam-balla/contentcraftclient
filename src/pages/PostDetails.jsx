import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onUpdate } from "../store/userSlice";

const PostDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Post Not Found</h2>
        <button
          onClick={() => navigate("/user/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Post link copied to clipboard!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link.");
    }
  };

  const handleReport = async () => {
    try {
      await axios.post(
        `https://content-craft-server-696839166197.us-central1.run.app/api/feed/report`,
        { feedId: post.id, message: "reported", content: post },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post reported successfully.");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to report post.");
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `https://content-craft-server-696839166197.us-central1.run.app/api/feed/save`,
        { feedId: post.id, content: post },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(onUpdate(res.data.user));
      toast.success("Post saved and credits updated!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "You already saved this post."
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow p-4 sm:p-6 rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          ⬅️ Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4 break-words">
          {post.title}
        </h1>
        <p className="text-gray-700 mb-4 whitespace-pre-line break-words">
          {post.content || post.selftext}
        </p>

        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Original Post
          </a>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Share
          </button>
          <button
            onClick={handleReport}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
