# D:\cloud-project\backend_api_inference\main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Any
import requests
import os

# =======================
# Configuration
# =======================
INFERENCE_API_URL = os.getenv("INFERENCE_API_URL", "http://localhost:5000")
INFERENCE_API_TOKEN = os.getenv("INFERENCE_API_TOKEN", "demo-token")

# =======================
# FastAPI App
# =======================
app = FastAPI(title="CIIDS Inference API", version="1.0")

# =======================
# Request Models
# =======================
class FeaturesRequest(BaseModel):
    features: dict

class BatchFeaturesRequest(BaseModel):
    features_list: List[dict]

# =======================
# Root Route
# =======================
@app.get("/")
def read_root():
    return {"message": "CIIDS Inference API is running!"}

# =======================
# Single Prediction Route
# =======================
@app.post("/predict")
def predict(request: FeaturesRequest):
    try:
        headers = {"Authorization": f"Bearer {INFERENCE_API_TOKEN}"}
        response = requests.post(
            f"{INFERENCE_API_URL}/predict",
            json={"features": request.features},
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Inference API error: {str(e)}")

# =======================
# Batch Prediction Route
# =======================
@app.post("/predict/batch")
def predict_batch(request: BatchFeaturesRequest):
    try:
        headers = {"Authorization": f"Bearer {INFERENCE_API_TOKEN}"}
        response = requests.post(
            f"{INFERENCE_API_URL}/predict/batch",
            json={"features_list": request.features_list},
            headers=headers,
            timeout=20
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Batch Inference API error: {str(e)}")

# =======================
# Health Check
# =======================
@app.get("/health")
def health_check():
    return {"status": "ok"}
