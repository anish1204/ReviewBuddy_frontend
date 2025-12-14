"use client";
import { useState, useRef } from "react";
import { api } from "@/utils/api";
import React from 'react'
import { HiMicrophone } from "react-icons/hi2";

const VoiceRecorder = ({vendorId,productId, userId, onUploaded }) => {   // <-- receive props
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
    fd.append("vendorId",vendorId);
    fd.append("productId",productId);
    fd.append("userId", userId);

    // If using interceptor & api.js baseURL use:
    // await api.post("/feedback/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
    console.log(vendorId,productId,fd,'user')
    await api.post("/feedback/upload-local-cloud", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if(onUploaded) onUploaded();
  };

  return (
    <button
      className="px-2 py-2 flex  items-center group justify-between lg:gap-x-[0.3rem] text-center bg-black hover:bg-white hover:text-black border-black border-[1px] text-white rounded"
      onClick={recording ? stopRecording : startRecording}
    >
      <HiMicrophone className="text-white font-medium group-hover:text-black" />
      {recording ? "Stop Recording" : "Press to Speak"}
    </button>
  );
}

export default VoiceRecorder;
