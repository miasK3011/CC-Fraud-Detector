import os
import pickle

import pandas as pd
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier

train_dataset = pd.read_csv("../dataset/train_dataset.csv", dtype=float)

X_train = train_dataset.drop(columns=["Class"])
y_train = train_dataset["Class"]

smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

base_model = RandomForestClassifier(
    n_estimators=100, 
    random_state=42,
    criterion="gini",
    max_depth=20,
    min_samples_leaf=1,
    min_samples_split=2,
)

base_model.fit(X_train_resampled, y_train_resampled)
model_dir = "../saved_models"
model_filename = os.path.join(model_dir, "rf_oversampling_model.pkl")
with open(model_filename, "wb") as file:
    pickle.dump(base_model, file)
print(f"Modelo salvo em: {model_filename}")