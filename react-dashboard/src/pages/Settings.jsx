// D:\cloud-project\dashboard\react-dashboard\src\pages\Settings.jsx
import React, { useState } from "react";

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSave = () => {
    setStatusMsg("✅ Settings saved successfully!");
    setTimeout(() => setStatusMsg(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">⚙️ Settings</h1>
      <p className="text-gray-600 mb-10">
        Manage your CIIDS Cloud Dashboard preferences.
      </p>

      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md text-left">
        <div className="mb-6">
          <label className="flex justify-between items-center">
            <span className="text-lg text-gray-700">Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="h-5 w-5 accent-blue-600"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="flex justify-between items-center">
            <span className="text-lg text-gray-700">
              Automatic System Updates
            </span>
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={() => setAutoUpdate(!autoUpdate)}
              className="h-5 w-5 accent-blue-600"
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Save Settings
        </button>

        {statusMsg && (
          <p className="text-green-600 font-medium text-center mt-4">
            {statusMsg}
          </p>
        )}
      </div>
    </div>
  );
}
