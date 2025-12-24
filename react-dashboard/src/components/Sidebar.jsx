import React from "react";
import { Shield, Activity, BarChart3, Settings } from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Overview", icon: <Shield size={20} /> },
    { name: "Alerts", icon: <Activity size={20} /> },
    { name: "Reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen w-60 bg-slate-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6 text-center">🌩️ CIIDS</h1>
      {menu.map((item) => (
        <button
          key={item.name}
          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-700 transition"
        >
          {item.icon}
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
