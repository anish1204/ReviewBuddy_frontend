"use client";

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

interface Feedback {
  _id: string;
  productId: string;
  transcription?: string;
  sentiment: {
    label: "positive" | "neutral" | "negative";
    score: number;
  };
  status: "pending" | "processed" | "failed";
  createdAt: string;
}

const VendorFeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* get vendorId */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
            let id = JSON.parse(storedUser).id;
      setVendorId(id);
    }
  }, []);

  /* fetch feedbacks */
  useEffect(() => {
    if (!vendorId) return;

    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/feedback/vendors/${vendorId}/products/analytics`
        );
        setFeedbacks(res.data.feedbacks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [vendorId]);

  /* delete feedback */
  const deleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}/feedbacks/${id}`
      );

      setFeedbacks(prev => prev.filter(fb => fb._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete feedback");
    }
  };

  /* search filter */
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(fb =>
      [
        fb.transcription,
        fb.sentiment.label,
        fb.productId,
        fb.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [feedbacks, search]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Vendor Feedback Analytics
      </h2>

      <input
        type="text"
        placeholder="Search feedback..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-3 py-2 mb-4 w-full rounded"
      />

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Product ID</th>
                <th className="border p-2 text-left">Transcription</th>
                <th className="border p-2">Sentiment</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    No feedback found
                  </td>
                </tr>
              ) : (
                filteredFeedbacks.map(fb => (
                  <tr key={fb._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-sm">
                      {fb.productId}
                    </td>

                    <td className="border p-2">
                      {fb.transcription || "—"}
                    </td>

                    <td
                      className={`border p-2 font-medium ${
                        fb.sentiment.label === "positive"
                          ? "text-green-600"
                          : fb.sentiment.label === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {fb.sentiment.label}
                    </td>

                    <td className="border p-2 text-center">
                      {fb.sentiment.score}
                    </td>

                    <td className="border p-2 text-center">
                      {fb.status}
                    </td>

                    <td className="border p-2 text-sm">
                      {new Date(fb.createdAt).toLocaleString()}
                    </td>

                    <td className="border p-2 text-center">
                      <button
                        onClick={() => deleteFeedback(fb._id)}
                        className="text-red-600 hover:underline"
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
      )}
    </div>
  );
};

export default VendorFeedbackTable;
