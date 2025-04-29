import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { onUpdate } from "../store/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    setIsLoading(true);
    try {
      const reddit = await axios.get("https://www.reddit.com/r/popular.json");
      const posts = reddit.data.data.children.map((p) => p.data);
      setFeed(posts);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load feed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const savePost = async (id, content) => {
    try {
      const res = await axios.post(
        `https://content-craft-server-696839166197.us-central1.run.app/api/feed/save`,
        { feedId: id, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(onUpdate(res.data.user));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error while saving post");
    }
  };

  const handleCardClick = (post) => {
    navigate(`/user/feed/${post.id}`, { state: { post, isSaved: false } });
  };

  const feedView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map((post, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(post)}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between items-start transition-transform hover:scale-[1.01]"
          >
            <h3 className="text-base sm:text-lg font-bold break-words mb-2">
              {post.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-3">
              {post.content?.substring(0, 100) ||
                post.selftext?.substring(0, 100)}
              ...
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePost(post.id, post);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const loadingView = () => (
    <div className="flex justify-center items-center h-96">
      <p className="text-xl font-semibold">Loading...</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Explore Feed
      </h1>
      {isLoading ? loadingView() : feedView()}
    </div>
  );
};

export default Feed;
