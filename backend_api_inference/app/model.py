// FILE: D:\cloud-project\backend_api_inference\app\model.py
import os
import joblib
import pandas as pd
import numpy as np
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

def load_model(model_path: str):
    """
    Load the trained model from disk
    """
    try:
        model_file = os.path.join(model_path, "ids_model.pkl")
        if not os.path.exists(model_file):
            raise FileNotFoundError(f"Model file not found at {model_file}")

        model = joblib.load(model_file)
        logger.info(f"Model loaded from {model_file}")
        return model
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

def predict_attack(model, features: Dict[str, Any]):
    """
    Make prediction on network traffic features
    """
    from .predict import PredictionResponse

    try:
        # Convert features to DataFrame
        feature_df = pd.DataFrame([features])

        # Ensure all required features are present
        required_features = model.feature_names_in_
        for feature in required_features:
            if feature not in feature_df.columns:
                feature_df[feature] = 0  # Default value for missing features

        # Select only required features in correct order
        feature_df = feature_df[required_features]

        # Make prediction
        prediction = model.predict(feature_df)[0]
        prediction_proba = model.predict_proba(feature_df)[0]

        # Get attack type and severity based on prediction
        attack_type, severity = get_attack_details(prediction, prediction_proba)

        return PredictionResponse(
            is_attack=bool(prediction),
            attack_type=attack_type,
            confidence=float(max(prediction_proba)),
            severity=severity,
            features_used=list(required_features)
        )
    except Exception as e:
        logger.error(f"Error making prediction: {str(e)}")
        raise

def get_attack_details(prediction: int, prediction_proba: np.ndarray) -> tuple:
    """
    Map prediction to attack type and severity
    """
    # Attack types mapping
    attack_types = {
        0: "Normal",
        1: "DoS/DDoS",
        2: "Port Scan",
        3: "Brute Force",
        4: "SQL Injection",
        5: "XSS",
        6: "R2L/U2R",
        7: "Suspicious DNS",
        8: "Unusual Traffic"
    }

    # Get attack type
    attack_type = attack_types.get(prediction, "Unknown")

    # Determine severity based on attack type and confidence
    confidence = max(prediction_proba)

    if prediction == 0:  # Normal
        severity = "Low"
    elif attack_type in ["DoS/DDoS", "SQL Injection", "XSS"]:
        severity = "High" if confidence > 0.8 else "Medium"
    elif attack_type in ["Port Scan", "Brute Force", "R2L/U2R"]:
        severity = "Medium" if confidence > 0.7 else "Low"
    else:
        severity = "Low" if confidence > 0.6 else "Info"

    return attack_type, severity

def preprocess_features(raw_features: Dict[str, Any]) -> Dict[str, Any]:
    """
    Preprocess raw features before prediction
    """
    try:
        # Convert to DataFrame for easier manipulation
        df = pd.DataFrame([raw_features])

        # Handle categorical features
        if 'protocol_type' in df.columns:
            protocol_map = {'tcp': 0, 'udp': 1, 'icmp': 2}
            df['protocol_type'] = df['protocol_type'].map(lambda x: protocol_map.get(x, 0))

        if 'service' in df.columns:
            common_services = {'http': 0, 'ftp': 1, 'smtp': 2, 'ssh': 3, 'dns': 4}
            df['service'] = df['service'].map(lambda x: common_services.get(x, 99))

        if 'flag' in df.columns:
            flag_map = {'SF': 0, 'REJ': 1, 'RSTR': 2, 'RSTO': 3, 'SH': 4, 'S1': 5, 'S2': 6, 'S3': 7}
            df['flag'] = df['flag'].map(lambda x: flag_map.get(x, 99))

        # Ensure numeric features are properly typed
        numeric_features = [
            'duration', 'src_bytes', 'dst_bytes', 'land', 'wrong_fragment',
            'urgent', 'hot', 'num_failed_logins', 'logged_in', 'num_compromised',
            'root_shell', 'su_attempted', 'num_root', 'num_file_creations',
            'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login',
            'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
            'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
            'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count',
            'dst_host_same_srv_rate', 'dst_host_diff_srv_rate',
            'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate',
            'dst_host_serror_rate', 'dst_host_srv_serror_rate',
            'dst_host_rerror_rate', 'dst_host_srv_rerror_rate'
        ]

        for feature in numeric_features:
            if feature in df.columns:
                df[feature] = pd.to_numeric(df[feature], errors='coerce').fillna(0)

        # Return as dictionary
        return df.iloc[0].to_dict()
    except Exception as e:
        logger.error(f"Error preprocessing features: {str(e)}")
        raise
