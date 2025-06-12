import pickle

from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier


def loadModel(path: str) -> RandomForestClassifier | XGBClassifier:
    try:
        with open(path, "rb") as file:
            loaded_model = pickle.load(file)
            return loaded_model
    except FileNotFoundError:
        raise FileNotFoundError(f"Model file not found at path: {path}")
    except Exception as e:
        raise Exception(f"Error loading model: {str(e)}")
