import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryPage = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    

    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_BASE}/symptoms/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchHistory();
    else {
      setLoading(false);
      setError("User ID not found.");
    }
  }, [userId, API_BASE]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Symptom History</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && !loading && <p className="text-red-400 text-center">{error}</p>}

      {!loading && !error && history.length === 0 && (
        <p className="text-center text-gray-400">No history found.</p>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {history.map((entry, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Entered Symptoms:</span>{" "}
                {entry.symptomsText}
              </p>
              {entry.extractedText && (
                <p className="mt-2">
                  <span className="font-semibold">Extracted Text:</span>{" "}
                  {entry.extractedText}
                </p>
              )}
              <p className="mt-2">
                <span className="font-semibold">Predicted Conditions:</span>{" "}
                {entry.predictedConditions.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
