# Cloud Functions for Cloud IDS

## Functions

- **processNetworkLog**: Triggered when a new network log is added to Firestore
- **sendAlertNotification**: Triggered when a new alert is created
- **manualProcessLog**: HTTP endpoint for manual log processing
- **batchProcessLogs**: HTTP endpoint for batch processing
- **cleanupOldData**: Scheduled function to clean up old data

## Local Development

Install dependencies:

```bash
npm install
