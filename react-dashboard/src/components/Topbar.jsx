import React from "react";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700">
        Welcome, Prathi! 🤍
      </h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=P&background=f0f0f0"
          alt="user"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
