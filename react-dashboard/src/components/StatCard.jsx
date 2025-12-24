import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition">
      <div className="p-3 bg-indigo-100 rounded-xl">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
