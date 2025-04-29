import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://content-craft-server-696839166197.us-central1.run.app/api/admin/reports",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setReports(res.data);
    } catch (err) {
      console.error("Failed to load reports:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDismiss = async (id) => {
    try {
      await axios.delete(
        `https://content-craft-server-696839166197.us-central1.run.app/api/admin/reports/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error dismissing report", err);
    }
  };

  const openFeedModal = async (feedId, reportId) => {
    setReportId(reportId);
    try {
      const res = await axios.get(
        `https://content-craft-server-696839166197.us-central1.run.app/api/feed/${feedId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data.feed.content);
      setSelectedFeed(res.data.feed.content);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeed(null);
    setReportId(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">User Reports</h1>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          Back to Home
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-600">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="border p-4 sm:p-6 rounded-lg shadow bg-white"
            >
              <p className="text-sm text-gray-500">
                <strong>Reported Feed ID:</strong> {report.feedId}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Reported By:</strong> {report.userId}
              </p>
              <p className="text-gray-800 mt-2 text-sm sm:text-base">
                <strong>Reason:</strong> {report.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(report.createdAt).toLocaleString()}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => openFeedModal(report.feedId, report._id)}
                >
                  View Feed
                </button>
                <button
                  className="text-sm bg-gray-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDismiss(report._id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedFeed && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg max-w-lg w-[90%] relative h-4/5 border-1 border-gray-400 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedFeed.title}</h2>
            <p className="text-gray-700 mb-4 h-3/5 overflow-y-auto">
              {selectedFeed.content || selectedFeed.selftext}
            </p>
            {selectedFeed.url && (
              <Link
                to={selectedFeed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Original
              </Link>
            )}
            <button
              className="text-sm bg-gray-600 text-white px-3 py-1 rounded ml-3"
              onClick={() => handleDismiss(reportId)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
