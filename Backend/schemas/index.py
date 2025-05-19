from typing import List

from pydantic import BaseModel


class TransactionData(BaseModel):
    features: List[float]


class PredictionResult(BaseModel):
    fraud_probability: float
    is_fraud: bool
