import os
import pickle

import pandas as pd
from imblearn.under_sampling import RandomUnderSampler
from xgboost import XGBClassifier

train_dataset = pd.read_csv("./dataset/train_dataset.csv", dtype=float)

X_train = train_dataset.drop(columns=["Class"])
y_train = train_dataset["Class"]

rus = RandomUnderSampler(random_state=42)
X_train_resampled, y_train_resampled = rus.fit_resample(X_train, y_train)

base_model = XGBClassifier(
    n_estimators=50,
    random_state=42,
    max_depth=10,
)

base_model.fit(X_train_resampled, y_train_resampled)
model_dir = "./saved_models"
model_filename = os.path.join(model_dir, "xgb_undersampling_model.pkl")
with open(model_filename, "wb") as file:
    pickle.dump(base_model, file)
print(f"Modelo salvo em: {model_filename}")
