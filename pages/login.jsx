"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import Button from './components/Button'
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Login() {
  const r = useRouter();
  const [f, setF] = useState({ email: "", password: "" });

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", f);
      console.log("LOGIN RESPONSE:", res.data);  // <--- debug

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      r.push(res.data.user.role === "admin" ? "/admin" : "/feedback");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="p-6 flex lg:h-screen justify-center flex-col gap-3 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">Login</h1>
      <input placeholder="Email" onChange={(e) => setF({ ...f, email: e.target.value })} className="border p-2" />
      <input placeholder="Password" type="password" onChange={(e) => setF({ ...f, password: e.target.value })} className="border p-2" />


      <div onClick={submit} className="w-full flex justify-center">
        <Button title={"Register"} type={"first"} />
      </div>



      <div className="w-full text-center">
        <p>
          Don&apos;t Have a Account? <Link className="underline text-blue-500" href="/register" >Click Here</Link>
        </p>
      </div>
    </div>
  );
}
