"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/feedback/all").then(r => setData(r.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="flex flex-col gap-4">
        {data.map((fb) => (
          <div key={fb._id} className="border p-3 rounded">
            <p><b>User:</b> {fb.user.name}</p>
            <audio controls src={fb.audioUrl}></audio>
            <p>{fb.transcription}</p>
            <p><b>Sentiment:</b> {fb.sentiment?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
