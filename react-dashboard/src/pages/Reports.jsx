// D:\cloud-project\dashboard\react-dashboard\src\pages\Reports.jsx
import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FileText, PieChart as PieIcon, BarChart2 } from "lucide-react";

const Reports = () => {
  // 🔹 Data for charts (you can later fetch this dynamically from Firestore)
  const severityData = [
    { name: "Critical", value: 12 },
    { name: "High", value: 18 },
    { name: "Medium", value: 10 },
    { name: "Low", value: 7 },
  ];

  const typeData = [
    { name: "Malware", count: 8 },
    { name: "Unauthorized Access", count: 10 },
    { name: "DDoS", count: 6 },
    { name: "Suspicious Login", count: 5 },
    { name: "API Abuse", count: 8 },
  ];

  const regionData = [
    { region: "US", alerts: 15 },
    { region: "Asia", alerts: 18 },
    { region: "Europe", alerts: 10 },
    { region: "Australia", alerts: 4 },
  ];

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="text-blue-600 w-7 h-7" />
        <h2 className="text-3xl font-bold text-gray-800">Cloud Threat Reports</h2>
      </div>

      <p className="text-gray-600 mb-8 text-lg">
        Comprehensive visual reports of detected threats across your cloud infrastructure.
      </p>

      {/* 🔸 Row 1: Severity Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <PieIcon className="text-red-500 w-5 h-5" />
            <h3 className="text-xl font-semibold text-gray-700">Alerts by Severity</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🔸 Row 1: Bar Chart for Type */}
        <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="text-green-600 w-5 h-5" />
            <h3 className="text-xl font-semibold text-gray-700">Alerts by Type</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔸 Row 2: Region-based Analysis */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-xl border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Alerts by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="alerts" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        📈 Tip: You can later add “Download Report” and “Export to PDF” buttons here.
      </p>
    </div>
  );
};

export default Reports;
