import pandas as pd

def load_sample_data():
    dataset = pd.read_csv("dataset/test_dataset.csv", dtype=float)
    fraud_samples = dataset[dataset["Class"] == 1].sample(n=5, random_state=42)
    non_fraud_samples = dataset[dataset["Class"] == 0].sample(n=5, random_state=42)
    selected_samples = pd.concat([fraud_samples, non_fraud_samples])
    return selected_samples.to_dict(orient="records")

def prepare_datasets(records):
    datasets_list = []
    dataset_samples_dict = {}

    for i, sample in enumerate(records):
        is_fraud = bool(sample.get("Class") == 1)
        features = [value for key, value in sample.items() if key != "Class"]
        
        datasets_list.append(
            {
                "id": i + 1,
                "label": f"{'Fraude' if is_fraud else 'Normal'} #{i + 1}",
            }
        )
        
        dataset_samples_dict[i + 1] = {
            "dataset": {"id": i + 1, "is_fraud": is_fraud, "value": features}
        }
        
    return datasets_list, dataset_samples_dict

records = load_sample_data()
datasets, dataset_samples = prepare_datasets(records)