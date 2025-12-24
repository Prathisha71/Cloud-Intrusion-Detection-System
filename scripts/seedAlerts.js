// D:\cloud-project\scripts\seedAlerts.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔑 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 10 Realistic Alerts ---
const realisticAlerts = [
  {
    type: "Malware Detected",
    severity: "Critical",
    service: "Compute Engine",
    region: "us-central1",
    sourceIP: "192.168.0.45",
    detectedAt: new Date().toISOString(),
    status: "Active",
  },
  {
    type: "Unauthorized Access Attempt",
    severity: "High",
    service: "Cloud Storage",
    region: "asia-south1",
    sourceIP: "14.98.22.178",
    detectedAt: new Date().toISOString(),
    status: "Active",
  },
  {
    type: "Suspicious API Traffic",
    severity: "Medium",
    service: "Cloud Functions",
    region: "europe-west1",
    sourceIP: "203.88.16.72",
    detectedAt: new Date().toISOString(),
    status: "Investigating",
  },
  {
    type: "DDoS Attempt",
    severity: "Critical",
    service: "Load Balancer",
    region: "us-east1",
    sourceIP: "185.33.91.210",
    detectedAt: new Date().toISOString(),
    status: "Mitigated",
  },
  {
    type: "Data Exfiltration Risk",
    severity: "High",
    service: "BigQuery",
    region: "australia-southeast1",
    sourceIP: "182.77.15.66",
    detectedAt: new Date().toISOString(),
    status: "Active",
  },
  {
    type: "Port Scanning Activity",
    severity: "Low",
    service: "VPC Network",
    region: "us-west1",
    sourceIP: "102.54.33.18",
    detectedAt: new Date().toISOString(),
    status: "Resolved",
  },
  {
    type: "Anomalous Login Behavior",
    severity: "Medium",
    service: "IAM",
    region: "asia-northeast1",
    sourceIP: "49.207.122.91",
    detectedAt: new Date().toISOString(),
    status: "Under Review",
  },
  {
    type: "Suspicious File Upload",
    severity: "High",
    service: "Cloud Storage",
    region: "europe-north1",
    sourceIP: "61.44.123.87",
    detectedAt: new Date().toISOString(),
    status: "Active",
  },
  {
    type: "Ransomware Detected",
    severity: "Critical",
    service: "Compute Engine",
    region: "us-central1",
    sourceIP: "192.168.0.99",
    detectedAt: new Date().toISOString(),
    status: "Active",
  },
  {
    type: "Suspicious Network Traffic",
    severity: "Medium",
    service: "VPC Network",
    region: "us-east1",
    sourceIP: "203.0.113.12",
    detectedAt: new Date().toISOString(),
    status: "Investigating",
  },
];

// --- 50 Random Alerts ---
const severities = ["Low", "Medium", "High", "Critical"];
const services = ["Compute Engine", "Cloud Storage", "BigQuery", "VPC Network", "IAM", "Cloud Functions"];
const regions = ["us-central1", "asia-south1", "europe-west1", "us-east1", "australia-southeast1", "europe-north1"];

async function seedAlerts() {
  console.log("Uploading realistic alerts...");
  for (const alert of realisticAlerts) {
    await addDoc(collection(db, "alerts"), alert);
    console.log("Added:", alert.type);
  }

  console.log("Uploading random alerts...");
  for (let i = 1; i <= 50; i++) {
    const alert = {
      type: `Random Alert ${i}`,
      severity: severities[Math.floor(Math.random() * severities.length)],
      service: services[Math.floor(Math.random() * services.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      sourceIP: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
      detectedAt: new Date().toISOString(),
      status: ["Active", "Mitigated", "Resolved", "Investigating"][Math.floor(Math.random()*4)],
    };
    await addDoc(collection(db, "alerts"), alert);
    console.log("Added:", alert.type);
  }

  console.log("✅ All alerts uploaded successfully!");
}

seedAlerts().catch((err) => console.error("Error uploading alerts:", err));
