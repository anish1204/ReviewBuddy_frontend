"use client";
import { useState, useRef } from "react";
import { api } from "@/utils/api";
import React from 'react'

const VoiceRecorder = ({ userId, onUploaded }) => {   // <-- receive props
  const [recording, setRecording] = useState(false);
  const recorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder.current = new MediaRecorder(stream);
    chunks.current = [];

    recorder.current.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.current.onstop = uploadAudio;

    recorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recorder.current.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    const blob = new Blob(chunks.current, { type: "audio/webm" });
    const fd = new FormData();

    fd.append("audio", blob);
    fd.append("userId", userId);  // <-- now defined

    // If using interceptor & api.js baseURL use:
    // await api.post("/feedback/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });

    await api.post("/feedback/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if(onUploaded) onUploaded();
  };

  return (
    <button
      className="px-4 py-2 bg-black text-white rounded"
      onClick={recording ? stopRecording : startRecording}
    >
      {recording ? "Stop Recording" : "Press to Speak"}
    </button>
  );
}

export default VoiceRecorder;
