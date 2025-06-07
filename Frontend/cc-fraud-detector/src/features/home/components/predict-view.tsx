"use client";
import { Alert, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getDatasetById } from "../api/client/get-dataset";
import { Dataset, DatasetOptions, Model, PredictionResponse } from "../types";
import PredictForm from "./predict-form";
import PredicResults from "./predict-results";
import PredictTabs from "./predict-tabs";

const modelPaths: Record<Model, string> = {
  "rf-under": "random-forest/undersampling",
  "rf-over": "random-forest/oversampling",
  lgbm: "lgbm",
  xgb: "xgb",
};

export default function PredictView({ options }: { options: DatasetOptions }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options.length > 0 ? options[0]?.value : null
  );

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Model>("rf-under");

  useEffect(() => {
    if (selectedOption) {
      loadDataset(selectedOption);
    }
  }, []);

  const loadDataset = async (value: string) => {
    try {
      setError(null);
      const result = await getDatasetById(value);
      if (result) {
        setDataset(result);
      } else {
        setError("Não foi possível carregar o dataset");
      }
    } catch (err) {
      setError("Erro ao carregar o dataset");
    }
  };

  const handleChange = async (value: string | null) => {
    setPrediction(null);
    setError(null);
    if (value !== null) {
      setSelectedOption(value);
      await loadDataset(value);
    }
  };

  return (
    <>
      {error && (
        <Alert
          title="Erro"
          color="red"
          withCloseButton
          onClose={() => setError(null)}
          mb="md"
        >
          {error}
        </Alert>
      )}
      <div className="flex flex-col mb-4 items-center">
        <div className="flex items-center w-full gap-4">
          <Select
            label="Selecione um dataset"
            placeholder="Escolha uma opção"
            data={options}
            value={selectedOption}
            onChange={handleChange}
            allowDeselect={false}
            className="w-full"
          />
          <PredictForm
            features={dataset?.dataset.value || []}
            setPrediction={setPrediction}
            onError={setError}
            model={modelPaths[activeTab]}
          />
        </div>
        <div className="w-full mt-4">
          <PredictTabs setActiveTab={setActiveTab} activeTab={activeTab} />
          {prediction ? (
            <PredicResults dataset={dataset} prediction={prediction} />
          ) : (
            <Text mt="md">
              Selecione um dataset e clique em prever para ver os resultados.
            </Text>
          )}
        </div>
      </div>
    </>
  );
}
