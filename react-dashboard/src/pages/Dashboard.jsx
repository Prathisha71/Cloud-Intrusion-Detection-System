// D:\cloud-project\dashboard\react-dashboard\src\pages\Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js"; // Make sure this points to your Firebase config

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "alerts"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setAlerts(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-center p-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">🌩️ CIIDS Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome! Monitoring and analyzing cloud threats in real time.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Active Alerts</h2>
          <p className="text-3xl text-blue-600 font-bold">{alerts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Cloud Instances</h2>
          <p className="text-3xl text-blue-600 font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">AI Risk Score</h2>
          <p className="text-3xl text-blue-600 font-bold">82%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Logs Processed</h2>
          <p className="text-3xl text-blue-600 font-bold">1.4M</p>
        </div>
      </div>

      {/* Real-time Alerts List */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-10 text-left">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ⚠️ Active Alerts
        </h2>
        {alerts.length === 0 ? (
          <p className="text-gray-600">No alerts currently.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert, index) => (
              <li key={index} className="border p-3 rounded-lg hover:bg-gray-50">
                <span className="font-semibold">{alert.type}</span> — 
                <span className="text-red-600 ml-1">{alert.severity}</span> — 
                <span className="text-gray-500 ml-1">{alert.timestamp}</span>
                {alert.ai_label && (
                  <span className="ml-2 text-purple-600 font-medium">
                    ({alert.ai_label})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Real-time Overview */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          🔍 Real-time Threat Overview
        </h2>
        <p className="text-gray-600">
          Connected to Firebase and Firestore Emulators. Monitoring cloud activity and security events in real time.
        </p>
      </div>

      {/* Navigation Buttons Section */}
      <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6">
        <Link
          to="/alerts"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-red-700 transition"
        >
          View Alerts ⚠️
        </Link>

        <Link
          to="/reports"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-green-700 transition"
        >
          View Reports 📑
        </Link>

        <Link
          to="/analytics"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-blue-700 transition"
        >
          View Analytics 📊
        </Link>

        <Link
          to="/settings"
          className="inline-block bg-gray-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:bg-gray-700 transition"
        >
          Settings ⚙️
        </Link>
      </div>
    </div>
  );
}
