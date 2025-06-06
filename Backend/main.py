from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import datasets, predictions

app = FastAPI(
    title="Credit Card Fraud Detection - API",
    description="API for predicting credit card fraud using a Random Forest model trained with undersampling."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(datasets.router, prefix="/datasets")
app.include_router(predictions.router, prefix="/predict")

@app.get("/")
async def read_root():
    return {"Status": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)