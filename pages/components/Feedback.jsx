"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { HiMicrophone } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import VoiceRecorder from "./VoiceRecorder";

export default function Feedback({ productId, vendorId }) {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  let feedbackdata = [
    {
      "user": "Anish",
      "sentiment": "Positive",
      "comment": "It was a great product"
    },
    {
      "user": "Karan",
      "sentiment": "Neutral",
      "comment": "It was a Okay"
    }, {
      "user": "Varun",
      "sentiment": "Negative",
      "comment": "It was a bad product"
    }, {
      "user": "Anish",
      "sentiment": "Positive",
      "comment": "It was a great product"
    }, {
      "user": "Anish",
      "sentiment": "Positive",
      "comment": "It was a great product"
    },
  ]

  // Load user from localStorage
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  // Fetch all feedback entries
  const loadFeedback = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await api.get(`/feedback/product/${productId}`, {
        params: { userId: user.id },
      });

      setList(res.data || []);
    } catch (err) {
      console.error("Error loading feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load when user is ready
  useEffect(() => {
    if (user) loadFeedback();
  }, [user]);

  if (!user) return <div className="p-6">Loading user...</div>;

  return (
    <div className="py-6 px-16 lg:min-h-screen w-full flex justify-start flex-col items-start">
      <h1 className="text-3xl font-semibold mb-4 flex items-center gap-2">
        Reviews
      </h1>

      {/* --- Record Button Component --- */}
      <VoiceRecorder productId={productId} vendorId={vendorId} userId={user.id} onUploaded={loadFeedback} />

      {/* --- Feedback History --- */}
      <h2 className="text-xl mt-8 mb-3 font-semibold">Your Previous Feedback</h2>

      {loading ? (
        <p>Loading feedback...</p>
      ) : list.length === 0 ? (
        <p className="text-gray-500">No Reviews</p>
      ) : (
        <div className="flex flex-col w-full gap-4">
          {list.map((fb) => (
            <div
              key={fb._id}
              className="border p-4 w-full rounded-lg shadow-sm bg-white"
            >
              <div className="w-full flex justify-between">
                <div className="flex lg:gap-x-2 font-semibold">
                  <FaUserCircle className="text-gray-700 text-2xl" />
                  {"User Name"}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mt-1">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
                  </div>

              </div>

              {/* <audio
                controls
                src={`${process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL}${fb.audioUrl}`}
                className="w-full"
              ></audio> */}

              <p className="mt-2">
                <b>Sentiment:</b>{" "}
                <span
                  className={` capitalize ${fb.sentiment?.label === "positive"
                    ? "text-green-600"
                    : fb.sentiment?.label === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                    } font-semibold`}
                >
                  {fb.sentiment?.label || "N/A"}
                </span>
              </p>

              <p className="text-gray-700 mt-1">{fb.transcription}</p>

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
