export interface Dataset {
  dataset: {
    id: number;
    is_fraud: boolean;
    value: number[]
  }
}

export type Model = "rf-under" | "rf-over" | "lgbm" | "xgb";

export interface DatasetsResponse {
  datasets: { id: number; label: string }[];
}

export interface DatasetOption {
  label: string;
  value: string;
}
export type DatasetOptions = DatasetOption[];

export interface PredictionResponse {
  model_name: string
  model_type: string
  accuracy: number
  precision: number
  recall: number
  f1_score: number
  auc_roc: number
  fraud_probability: number
  is_fraud: boolean
}