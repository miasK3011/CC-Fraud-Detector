import os
import pickle

import pandas as pd
from imblearn.under_sampling import RandomUnderSampler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("dataset/creditcard.csv", dtype=float)

X = df.drop(columns=["Time", "Class"])
y = df["Class"]
X = X[y.notna()]
y = y[y.notna()]

scaler = StandardScaler()
X["Amount"] = scaler.fit_transform(X["Amount"].values.reshape(-1, 1))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

rus = RandomUnderSampler(random_state=42)
X_train_resampled, y_train_resampled = rus.fit_resample(X_train, y_train)

base_model = RandomForestClassifier(
    n_estimators=50,
    random_state=42,
    criterion="gini",
    max_depth=10,
    min_samples_leaf=1,
    min_samples_split=5,
)

base_model.fit(X_train_resampled, y_train_resampled)

output_dir = "dataset"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

train_dataset_filename = os.path.join(output_dir, "train_dataset.csv")
test_dataset_filename = os.path.join(output_dir, "test_dataset.csv")

train_data = pd.concat([X_train_resampled, y_train_resampled], axis=1)
test_data = pd.concat([X_test, y_test], axis=1)

train_data.to_csv(train_dataset_filename, index=False)
test_data.to_csv(test_dataset_filename, index=False)

print(f"Dataset de treino salvo em: {train_dataset_filename}")
print(f"Dataset de teste salvo em: {test_dataset_filename}")

model_dir = "saved_models"
model_filename = os.path.join(model_dir, "rf_undersampling_model.pkl")
with open(model_filename, "wb") as file:
    pickle.dump(base_model, file)
print(f"Modelo salvo em: {model_filename}")
