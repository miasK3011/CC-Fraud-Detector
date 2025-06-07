
from dataclasses import Field
from typing import List

from pydantic import BaseModel, Field


class TransactionData(BaseModel):
    features: List[float]


class PredictionResult(BaseModel):
    """
    Schema for the prediction result of a transaction.
    This schema includes the model name, various performance metrics,
    the threshold used for classification, and the predicted fraud probability.
    """
    model_name: str = Field(
        ...,
        description="Nome do modelo a ser utilizado para a predição.",
        example="random-forest"
    )
    accuracy: float = Field(
        ...,
        description="Acurácia do modelo na predição.",
        example=0.80
    )
    precision: float = Field(
        ...,
        description="Precisão do modelo na predição.",
        example=0.70
    )
    recall: float = Field(
        ...,
        description="Recall do modelo na predição.",
        example=0.80
    )
    f1_score: float = Field(
        ...,
        description="F1 Score do modelo na predição.",
        example=0.75
    )
    threshold: float = Field(
        ...,
        description="Limite de probabilidade para classificar uma transação como fraude.",
        example=0.8596
    )
    auc_roc: float = Field(
        ...,
        description="Área sob a curva ROC do modelo.",
        example=0.97
    )
    fraud_probability: float = Field(
        ...,
        description="Probabilidade de fraude da transação.",
        example=85.96
    )
    is_fraud: bool = Field(
        ...,
        description="Indica se a transação é considerada fraude.",
        example=True
    )
