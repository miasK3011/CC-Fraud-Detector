import os
import pickle

import pandas as pd
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier

train_dataset = pd.read_csv("./dataset/train_dataset.csv", dtype=float)

X_train = train_dataset.drop(columns=["Class"])
y_train = train_dataset["Class"]

best_params = {
    'learning_rate': 0.1, 
    'max_depth': 5, 
    'min_child_weight': 1, 
    'n_estimators': 300
}

rus = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = rus.fit_resample(X_train, y_train)

base_model = XGBClassifier(
    random_state=42, use_label_encoder=False, eval_metric='logloss', **best_params
)

base_model.fit(X_train_resampled, y_train_resampled)
model_dir = "./saved_models"
model_filename = os.path.join(model_dir, "xgb_oversampling_model.pkl")
with open(model_filename, "wb") as file:
    pickle.dump(base_model, file)
print(f"Modelo salvo em: {model_filename}")
