import numpy as np
from fastapi import APIRouter, HTTPException

from ..schemas.index import PredictionResult, TransactionData
from ..utils.loadModel import loadModel

router = APIRouter()

@router.post(
    "/random-forest/undersampling/",
    response_model=PredictionResult,
    tags=["Predictions"]
)
async def predict_transaction(data: TransactionData):
    model = loadModel("saved_models/rf_undersampling_model.pkl")
    model.feature_names_in_ = None

    try:
        features = np.array(data.features).reshape(1, -1)
        probabilities = model.predict_proba(features)[:, 1]
        predictions = (probabilities >= 0.8596).astype(int)

        return {
            "fraud_probability": float(probabilities[0]) * 100,
            "is_fraud": bool(predictions[0] == 1),
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Erro na predição: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")