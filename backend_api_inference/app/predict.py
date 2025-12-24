from pydantic import BaseModel, Field
from typing import Dict, Any, List

class PredictionRequest(BaseModel):
    """Request model for prediction endpoint"""
    features: Dict[str, Any] = Field(..., description="Network traffic features")

    class Config:
        schema_extra = {
            "example": {
                "features": {
                    "duration": 0,
                    "protocol_type": "tcp",
                    "service": "http",
                    "flag": "SF",
                    "src_bytes": 215,
                    "dst_bytes": 45076,
                    "land": 0,
                    "wrong_fragment": 0,
                    "urgent": 0,
                    "hot": 0,
                    "num_failed_logins": 0,
                    "logged_in": 1,
                    "num_compromised": 0,
                    "root_shell": 0,
                    "su_attempted": 0,
                    "num_root": 0,
                    "num_file_creations": 0,
                    "num_shells": 0,
                    "num_access_files": 1,
                    "num_outbound_cmds": 0,
                    "is_host_login": 0,
                    "is_guest_login": 0,
                    "count": 2,
                    "srv_count": 2,
                    "serror_rate": 0.0,
                    "srv_serror_rate": 0.0,
                    "rerror_rate": 0.0,
                    "srv_rerror_rate": 0.0,
                    "same_srv_rate": 1.0,
                    "diff_srv_rate": 0.0,
                    "srv_diff_host_rate": 0.0,
                    "dst_host_count": 10,
                    "dst_host_srv_count": 10,
                    "dst_host_same_srv_rate": 1.0,
                    "dst_host_diff_srv_rate": 0.0,
                    "dst_host_same_src_port_rate": 0.0,
                    "dst_host_srv_diff_host_rate": 0.0,
                    "dst_host_serror_rate": 0.0,
                    "dst_host_srv_serror_rate": 0.0,
                    "dst_host_rerror_rate": 0.0,
                    "dst_host_srv_rerror_rate": 0.0
                }
            }
        }

class PredictionResponse(BaseModel):
    """Response model for prediction endpoint"""
    is_attack: bool = Field(..., description="Whether the traffic is malicious")
    attack_type: str = Field(..., description="Type of attack detected")
    confidence: float = Field(..., description="Confidence score of the prediction")
    severity: str = Field(..., description="Severity level of the attack")
    features_used: List[str] = Field(..., description="Features used for prediction")

class ExplainabilityResponse(BaseModel):
    """Response model for explainability endpoint"""
    explanation_plot: str = Field(..., description="Base64 encoded SHAP plot")
    feature_importance: Dict[str, float] = Field(..., description="Feature importance scores")

class BatchPredictionRequest(BaseModel):
    """Request model for batch prediction"""
    features_list: List[Dict[str, Any]] = Field(..., description="List of network traffic features")

class BatchPredictionResponse(BaseModel):
    """Response model for batch prediction"""
    predictions: List[PredictionResponse] = Field(..., description="List of predictions")
    summary: Dict[str, Any] = Field(..., description="Summary statistics of predictions")
