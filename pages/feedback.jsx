"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import VoiceRecorder from "./components/VoiceRecorder";

export default function Feedback() {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const load = async () => {
    if (!user) return;  
    const res = await api.get("/feedback/my", { userId: user.id });
    setList(res.data);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 lg:h-screen">
      <h1 className="text-2xl font-semibold mb-4">Give Voice Feedback</h1>

      <VoiceRecorder userId={user.id} onUploaded={load} />

      <h2 className="text-xl mt-6 mb-3">Your Previous Feedback</h2>
      <div className="flex flex-col gap-4">
        {list.map((fb) => (
          <div key={fb._id} className="border p-3 rounded">
            <audio controls src={`http://localhost:5000${fb.audioUrl}`}></audio>
            <p><b>Sentiment:</b> {fb.sentiment?.label}</p>
            <p>{fb.transcription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
