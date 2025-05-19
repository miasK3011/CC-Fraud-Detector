import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas.index import PredictionResult, TransactionData
from utils.loadModel import loadModel

app = FastAPI()
app.title = "Credit Card Fraud Detection - API"
app.description = "API for predicting credit card fraud using a Random Forest model trained with undersampling."
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dataset = pd.read_csv("dataset/test_dataset.csv", dtype=float)
fraud_samples = dataset[dataset["Class"] == 1].sample(n=5, random_state=42)
non_fraud_samples = dataset[dataset["Class"] == 0].sample(n=5, random_state=42)
selected_samples = pd.concat([fraud_samples, non_fraud_samples])
result = selected_samples.to_dict(orient="records")

datasets = []
for i, sample in enumerate(result):
    is_fraud = bool(sample.get("Class") == 1)
    features = [value for key, value in sample.items() if key != "Class"]
    
    datasets.append({
        "id": i + 1,  # ID de 1 a 10
        "label": f"{'Fraude' if is_fraud else 'Normal'} #{i + 1}",
    })

dataset_samples = {}
for i, sample in enumerate(result):
    is_fraud = bool(sample.get("Class") == 1)
    features = [value for key, value in sample.items() if key != "Class"]
    
    dataset_samples[i + 1] = {
        "dataset": {
            "id": i + 1,
            "is_fraud": is_fraud,
            "value": features
        }
    }

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/datasets/")
def list_datasets():
    """
    Endpoint to list available datasets for testing.
    """
    return {"datasets": datasets}


@app.get("/datasets/{dataset_id}/")
def get_dataset(dataset_id: int):
    """
    Endpoint to retrieve a specific dataset by its ID.
    """
    # Verifica se o ID está dentro do intervalo válido (1 a 10)
    if dataset_id < 1 or dataset_id > len(datasets):
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Retorna o dataset correspondente ao ID
    return dataset_samples[dataset_id]

@app.post(
    "/predict/",
    response_model=PredictionResult,
    responses={
        200: {
            "description": "Prediction successful. Returns the prediction result with probability."
        },
        400: {
            "description": "Bad Request - Error during prediction",
            "content": {
                "application/json": {
                    "example": {"detail": "Erro na predição: mensagem do erro"}
                }
            },
        },
        500: {
            "description": "Internal Server Error",
            "content": {
                "application/json": {"example": {"detail": "Internal server error"}}
            },
        },
    },
)
async def predict_transaction(data: TransactionData):
    """
    Predict if a transaction is fraudulent or not.
    """
    model = loadModel("saved_models/rf_undersampling_model.pkl")
    model.feature_names_in_ = None
    
    try:
        features = np.array(data.features)
        features = features.reshape(1, -1)

        predictions = model.predict(features)
        probabilities = model.predict_proba(features)[:, 1]

        results = {
            "fraud_probability": float(probabilities[0]) * 100,
            "is_fraud": bool(predictions[0] == 1),
        }

        return results

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Erro na predição: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)