// D:\cloud-project\dashboard\react-dashboard\src\pages\Alerts.jsx
import React from "react";
import { AlertTriangle, Shield, Server, Globe, Activity } from "lucide-react";

const Alerts = () => {
  // Sample expanded alert data (can be fetched from Firestore later)
  const alertData = [
    {
      id: 1,
      type: "Malware Detected",
      severity: "Critical",
      service: "Compute Engine",
      region: "us-central1",
      sourceIP: "192.168.0.45",
      detectedAt: "2025-11-07 10:24:32",
      status: "Active",
    },
    {
      id: 2,
      type: "Unauthorized Access Attempt",
      severity: "High",
      service: "Cloud Storage",
      region: "asia-south1",
      sourceIP: "14.98.22.178",
      detectedAt: "2025-11-07 09:55:12",
      status: "Active",
    },
    {
      id: 3,
      type: "Suspicious API Traffic",
      severity: "Medium",
      service: "Cloud Functions",
      region: "europe-west1",
      sourceIP: "203.88.16.72",
      detectedAt: "2025-11-07 09:22:48",
      status: "Investigating",
    },
    {
      id: 4,
      type: "DDoS Attempt",
      severity: "Critical",
      service: "Load Balancer",
      region: "us-east1",
      sourceIP: "185.33.91.210",
      detectedAt: "2025-11-07 08:40:05",
      status: "Mitigated",
    },
    {
      id: 5,
      type: "Data Exfiltration Risk",
      severity: "High",
      service: "BigQuery",
      region: "australia-southeast1",
      sourceIP: "182.77.15.66",
      detectedAt: "2025-11-07 07:15:43",
      status: "Active",
    },
    {
      id: 6,
      type: "Port Scanning Activity",
      severity: "Low",
      service: "VPC Network",
      region: "us-west1",
      sourceIP: "102.54.33.18",
      detectedAt: "2025-11-07 06:30:10",
      status: "Resolved",
    },
    {
      id: 7,
      type: "Anomalous Login Behavior",
      severity: "Medium",
      service: "IAM",
      region: "asia-northeast1",
      sourceIP: "49.207.122.91",
      detectedAt: "2025-11-07 05:58:22",
      status: "Under Review",
    },
    {
      id: 8,
      type: "Suspicious File Upload",
      severity: "High",
      service: "Cloud Storage",
      region: "europe-north1",
      sourceIP: "61.44.123.87",
      detectedAt: "2025-11-07 04:12:37",
      status: "Active",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="text-red-600 w-7 h-7" />
        <h2 className="text-3xl font-bold text-gray-800">Cloud Security Alerts</h2>
      </div>

      <p className="text-gray-600 mb-6 text-lg">
        Real-time detection and tracking of potential threats across your cloud infrastructure.
      </p>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-5">Type</th>
              <th className="py-3 px-5">Severity</th>
              <th className="py-3 px-5">Service</th>
              <th className="py-3 px-5">Region</th>
              <th className="py-3 px-5">Source IP</th>
              <th className="py-3 px-5">Detected At</th>
              <th className="py-3 px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {alertData.map((alert) => (
              <tr
                key={alert.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-5 flex items-center gap-2">
                  {alert.severity === "Critical" ? (
                    <Shield className="text-red-500 w-5 h-5" />
                  ) : alert.severity === "High" ? (
                    <Activity className="text-orange-500 w-5 h-5" />
                  ) : (
                    <Server className="text-yellow-500 w-5 h-5" />
                  )}
                  {alert.type}
                </td>
                <td
                  className={`py-3 px-5 font-semibold ${
                    alert.severity === "Critical"
                      ? "text-red-600"
                      : alert.severity === "High"
                      ? "text-orange-600"
                      : alert.severity === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {alert.severity}
                </td>
                <td className="py-3 px-5">{alert.service}</td>
                <td className="py-3 px-5">{alert.region}</td>
                <td className="py-3 px-5 text-gray-700 font-mono">{alert.sourceIP}</td>
                <td className="py-3 px-5">{alert.detectedAt}</td>
                <td
                  className={`py-3 px-5 font-medium ${
                    alert.status === "Active"
                      ? "text-red-600"
                      : alert.status === "Mitigated"
                      ? "text-green-600"
                      : alert.status === "Resolved"
                      ? "text-gray-500"
                      : "text-yellow-600"
                  }`}
                >
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        📊 Tip: Integrate AI-based alert prioritization and export reports from this page later.
      </p>
    </div>
  );
};

export default Alerts;
