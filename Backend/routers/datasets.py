from fastapi import APIRouter, HTTPException
from ..data_processing import datasets, dataset_samples

router = APIRouter()

@router.get("/", tags=["Datasets"])
def list_datasets():
    return {"datasets": datasets}

@router.get("/{dataset_id}/", tags=["Datasets"])
def get_dataset(dataset_id: int):
    if dataset_id not in dataset_samples:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset_samples[dataset_id]