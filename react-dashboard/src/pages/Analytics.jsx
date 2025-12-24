import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const data = [
    { name: "Mon", threats: 4, alerts: 2 },
    { name: "Tue", threats: 3, alerts: 3 },
    { name: "Wed", threats: 5, alerts: 1 },
    { name: "Thu", threats: 2, alerts: 4 },
    { name: "Fri", threats: 6, alerts: 2 },
    { name: "Sat", threats: 3, alerts: 5 },
    { name: "Sun", threats: 4, alerts: 3 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        📊 Cloud Threat Analytics
      </h1>
      <p className="text-gray-600 mb-4">
        Weekly analysis of detected threats and alert trends
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="threats"
              stroke="#2563eb"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="alerts"
              stroke="#f43f5e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
