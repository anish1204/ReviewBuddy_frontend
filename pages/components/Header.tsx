import { useUser } from "@/src/context/UserContext";
import { useState } from "react";


const Header = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between p-4 shadow">
      <h1>ReviewBuddy</h1>

      <div className="relative">
        <button onClick={() => setOpen(!open)}>
          👤
        </button>

        {open && user && (
          <div className="absolute right-0 mt-2 bg-white border shadow rounded p-4 w-64">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm capitalize">{user.role}</p>

            <button
              className="mt-3 text-red-600"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
