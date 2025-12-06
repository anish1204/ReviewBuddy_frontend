"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import Button from './components/Button'
export default function Register() {
  const r = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    try {
      const res = await api.post("/auth/register", f);
      console.log("REGISTER SUCCESS:", res.data);
      r.push("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);   // <-- print backend response
      alert(err.response?.data?.message || "Register failed");
    }
  };


  return (
    <div className="p-6 flex lg:h-screen flex-col items-center2 justify-center gap-3 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">Register</h1>
      <input placeholder="Name" onChange={(e) => setF({ ...f, name: e.target.value })} className="border p-2" />
      <input placeholder="Email" onChange={(e) => setF({ ...f, email: e.target.value })} className="border p-2" />
      <input placeholder="Password" type="password" onChange={(e) => setF({ ...f, password: e.target.value })} className="border p-2" />
      <select className="border p-2" defaultValue="">
        <option value="" disabled>
          Select Role
        </option>
        {/* <option value="admin">Admin</option> */}
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>

      <div onClick={submit} className="w-full flex justify-center">
        <Button title={"Register"} type={"first"} />
      </div>
      <div className="w-full text-center">
        <p>
          Already Have a Account? <a className="underline text-blue-500" href="/login" >Click Here</a>
        </p>
      </div>
    </div>
  );
}
