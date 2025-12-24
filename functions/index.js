const { setGlobalOptions } = require("firebase-functions");
const { onRequest, onDocumentCreated, schedule } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

// Config
const INFERENCE_API_URL = process.env.INFERENCE_API_URL || "http://localhost:8000";
const INFERENCE_API_TOKEN = process.env.INFERENCE_API_TOKEN || "demo-token";
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;

setGlobalOptions({ maxInstances: 10 });

/**
 * Trigger: on new network log document
 */
exports.processNetworkLog = onDocumentCreated(
  "network_logs/{logId}",
  async (event) => {
    const logData = event.data?.data();
    const logId = event.params.logId;
    if (!logData || logData.processed) return;

    try {
      const prediction = await callInferenceAPI(logData.features);

      await db.collection("predictions").add({
        logId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        prediction,
        logData
      });

      if (prediction.is_attack) {
        await createAlert(logId, logData, prediction);
      }

      await event.data.ref.update({ processed: true });
    } catch (error) {
      console.error("Error processing network log:", error);
    }
  }
);

/**
 * Trigger: on new alert document for notifications
 */
exports.sendAlertNotification = onDocumentCreated(
  "alerts/{alertId}",
  async (event) => {
    const alertData = event.data?.data();
    const alertId = event.params.alertId;
    if (!alertData || alertData.severity !== "High") return;

    try {
      const adminUsers = await getAdminUsers();
      const tokens = adminUsers.map(u => u.fcmToken).filter(Boolean);

      if (tokens.length > 0) {
        await messaging.sendMulticast({
          tokens,
          notification: {
            title: "Security Alert",
            body: `${alertData.attack_type} detected with ${alertData.confidence}% confidence`
          },
          data: { alertId, type: "security_alert" }
        });
        console.log(`Alert notification sent to ${tokens.length} admin users`);
      }

      if (SENDGRID_API_KEY) {
        await sendEmailNotification(adminUsers, alertData);
      }
    } catch (error) {
      console.error("Error sending alert notification:", error);
    }
  }
);

/**
 * HTTP: manual log processing
 */
exports.manualProcessLog = onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  const { features } = req.body;
  if (!features) return res.status(400).send("Missing features in request body");

  try {
    const prediction = await callInferenceAPI(features);

    await db.collection("manual_predictions").add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      features,
      prediction,
      source: "manual"
    });

    if (prediction.is_attack) {
      await createAlert("manual", { features }, prediction);
    }

    return res.status(200).json(prediction);
  } catch (error) {
    console.error("Error in manual process log:", error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * HTTP: batch log processing
 */
exports.batchProcessLogs = onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  const { features_list } = req.body;
  if (!features_list || !Array.isArray(features_list)) return res.status(400).send("Missing or invalid features_list");

  try {
    const batchPrediction = await callBatchInferenceAPI(features_list);

    await db.collection("batch_predictions").add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      count: features_list.length,
      predictions: batchPrediction.predictions,
      summary: batchPrediction.summary,
      source: "batch"
    });

    for (let i = 0; i < batchPrediction.predictions.length; i++) {
      if (batchPrediction.predictions[i].is_attack) {
        await createAlert(`batch_${i}`, { features: features_list[i] }, batchPrediction.predictions[i]);
      }
    }

    return res.status(200).json(batchPrediction);
  } catch (error) {
    console.error("Error in batch process logs:", error);
    return res.status(500).send("Internal server error");
  }
});

/**
 * Helpers: Call inference API
 */
async function callInferenceAPI(features) {
  try {
    const res = await axios.post(
      `${INFERENCE_API_URL}/predict`,
      { features },
      { headers: { Authorization: `Bearer ${INFERENCE_API_TOKEN}`, "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("Error calling inference API:", error);
    throw error;
  }
}

async function callBatchInferenceAPI(features_list) {
  try {
    const res = await axios.post(
      `${INFERENCE_API_URL}/predict/batch`,
      { features_list },
      { headers: { Authorization: `Bearer ${INFERENCE_API_TOKEN}`, "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("Error calling batch inference API:", error);
    throw error;
  }
}

/**
 * Helpers: Create alert
 */
async function createAlert(logId, logData, prediction) {
  try {
    const alertData = {
      logId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      attack_type: prediction.attack_type,
      confidence: prediction.confidence,
      severity: prediction.severity,
      status: "open",
      acknowledged: false,
      acknowledged_by: null,
      acknowledged_at: null,
      resolved: false,
      resolved_by: null,
      resolved_at: null,
      log_data: logData,
      prediction
    };
    const ref = await db.collection("alerts").add(alertData);
    console.log(`Alert created: ${ref.id}`);
    return ref.id;
  } catch (error) {
    console.error("Error creating alert:", error);
    throw error;
  }
}

/**
 * Helpers: Get admin users
 */
async function getAdminUsers() {
  try {
    const snap = await db.collection("users")
      .where("role", "==", "admin")
      .where("notifications_enabled", "==", true)
      .get();
    return snap.docs.map(d => d.data());
  } catch (error) {
    console.error("Error getting admin users:", error);
    return [];
  }
}

/**
 * Helpers: Email notification placeholder
 */
async function sendEmailNotification(users, alertData) {
  console.log(`Email notification would be sent to ${users.length} admin users about ${alertData.attack_type}`);
  return true;
}

/**
 * Scheduled cleanup of old data (every 24h)
 */
exports.cleanupOldData = schedule("every 24 hours").onRun(async () => {
  try {
    const now = admin.firestore.Timestamp.now();
    const thirtyDaysAgo = new admin.firestore.Timestamp(now.seconds - 30 * 24 * 60 * 60, now.nanoseconds);

    const oldPreds = await db.collection("predictions")
      .where("timestamp", "<", thirtyDaysAgo)
      .get();

    const batch = db.batch();
    oldPreds.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    console.log(`Cleaned up ${oldPreds.size} old prediction records`);
  } catch (error) {
    console.error("Error cleaning up old data:", error);
  }
});
