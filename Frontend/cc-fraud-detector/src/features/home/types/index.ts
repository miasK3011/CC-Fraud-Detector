export interface Dataset {
  dataset: {
    id: number;
    is_fraud: boolean;
    value: number[]
  }
}

export interface DatasetsResponse {
  datasets: { id: number; label: string }[];
}


export interface DatasetOption {
  label: string;
  value: string;
}
export type DatasetOptions = DatasetOption[];

export interface PredictionResponse {
  prediction: 0
  fraud_probability: number
  is_fraud: boolean
}