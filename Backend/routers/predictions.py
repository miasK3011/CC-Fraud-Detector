import numpy as np
from fastapi import APIRouter, HTTPException

from ..schemas.index import PredictionResult, TransactionData
from ..utils.loadModel import loadModel

router = APIRouter()

@router.post(
    "/random-forest/undersampling/",
    response_model=PredictionResult,
    tags=["Random Forest"],
    summary="Predição de fraude usando modelo Random Forest com undersampling",
)
async def predict_random_forest_undersampling(data: TransactionData, threshold: float = 0.8596):
    """
    Realiza a predição de fraude em transações usando um modelo de Random Forest treinado com undersampling.
    """
    model = loadModel("saved_models/rf_undersampling_model.pkl")
    model.feature_names_in_ = None

    try:
        features = np.array(data.features).reshape(1, -1)
        probabilities = model.predict_proba(features)[:, 1]
        predictions = (probabilities >= threshold).astype(int)

        return {
            'model_name': "Random Forest Undersampling",
            'accuracy': 0.80,
            'precision': 0.70,
            'recall': 0.80,
            'f1_score': 0.75,
            'threshold': threshold,
            'auc_roc': 0.97,
            "fraud_probability": float(probabilities[0]) * 100,
            "is_fraud": bool(predictions[0] == 1),
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Erro na predição: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@router.post(
    "/random-forest/oversampling/",
    response_model=PredictionResult,
    tags=["Random Forest"],
    summary="Predição de fraude usando modelo Random Forest com oversampling (SMOTE)",
)
async def predict_random_forest_oversampling(data: TransactionData, threshold: float = 0.3586):
    """
    Realiza a predição de fraude em transações usando um modelo de Random Forest treinado com oversampling (SMOTE).
    """
    model = loadModel("saved_models/rf_oversampling_model.pkl")
    model.feature_names_in_ = None

    try:
        features = np.array(data.features).reshape(1, -1)
        probabilities = model.predict_proba(features)[:, 1]
        predictions = (probabilities >= threshold).astype(int)

        return {
            'model_name': "Random Forest Oversampling SMOTE",
            'accuracy': 0.80,
            'precision': 0.69,
            'recall': 0.84,
            'f1_score': 0.88,
            'threshold': threshold,
            'auc_roc': 0.96,
            "fraud_probability": float(probabilities[0]) * 100,
            "is_fraud": bool(predictions[0] == 1),
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Erro na predição: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
