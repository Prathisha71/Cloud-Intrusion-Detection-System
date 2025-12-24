// D:\cloud-project\dashboard\react-dashboard\src\App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import { LayoutDashboard, AlertTriangle, BarChart3, Settings, Activity } from "lucide-react";

// Sidebar Component
function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Alerts", path: "/alerts", icon: <AlertTriangle size={18} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <Activity size={18} /> },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">🌩️ CIIDS</h1>
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

// Main App Layout
function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
