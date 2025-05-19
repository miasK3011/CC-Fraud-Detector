"use client";
import {
  Alert,
  Badge,
  Card,
  CardSection,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getDatasetById } from "../api/client/get-dataset";
import { Dataset, DatasetOptions, PredictionResponse } from "../types";
import PredictForm from "./predict-form";

export default function PredictView({ options }: { options: DatasetOptions }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options.length > 0 ? options[0]?.value : null
  );

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse>();
  const [error, setError] = useState<string | null>(null);

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
      console.error("Erro ao carregar o dataset:", err);
      setError("Erro ao carregar o dataset");
    }
  };

  const handleChange = async (value: string | null) => {
    if (value !== null) {
      setSelectedOption(value);
      await loadDataset(value);
    }
  };

  if (error) {
    return (
      <Alert
        title="Erro"
        color="red"
        withCloseButton
        onClose={() => setError(null)}
      >
        {error}
      </Alert>
    );
  }

  return (
    <>
      <div className="flex gap-4 mb-4 items-center">
        <Select
          label="Selecione um dataset"
          placeholder="Escolha uma opção"
          data={options}
          value={selectedOption}
          onChange={handleChange}
          allowDeselect={false}
          mb="lg"
          className="w-full"
        />
        <PredictForm
          features={dataset?.dataset.value || []}
          setPrediction={setPrediction}
        />
      </div>
      <div className="flex gap-4 h-full">
        {dataset && (
          <Card shadow="xs" padding="md" radius="md" withBorder>
            <Text fw={700} fz="lg" mb="md">
              Informações da Transação
            </Text>
            <div className="flex items-center justify-between gap-2 mb-4">
              <Text>ID: {dataset.dataset.id || "N/A"}</Text>
              <Badge
                color={dataset.dataset.is_fraud ? "red" : "green"}
                variant="light"
              >
                {dataset.dataset.is_fraud !== undefined
                  ? dataset.dataset.is_fraud
                    ? "Fraude"
                    : "Não fraude"
                  : "Dados incompletos"}
              </Badge>
            </div>
            <Table.ScrollContainer minWidth={300} maxHeight={320}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Feature</Table.Th>
                    <Table.Th>Valor</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {dataset.dataset.value.slice(0, 28).map((item, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>V{index + 1}</Table.Td>
                      <Table.Td>{item.toString()}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>
        )}

        <div className="w-full flex-1">
          {prediction ? (
            <div className="flex flex-col gap-4">
              <Card
                shadow="xs"
                padding="md"
                radius="md"
                withBorder
                className="w-full"
              >
                <CardSection p={"md"}>
                  <Text fw={700} fz="lg" mb="md">
                    Resultado da Detecção
                  </Text>
                </CardSection>
                <div
                  className={`flex items-center justify-center mb-4 p-4 ${
                    prediction.is_fraud ? "bg-red-200" : "bg-green-200"
                  } rounded-md`}
                >
                  <Text
                    size="72px"
                    c={prediction.is_fraud ? "red" : "green"}
                    className="text-center"
                  >
                    {prediction.is_fraud ? "Fraude" : "Não Fraude"}
                  </Text>
                </div>
                <Text className="text-center mb-4">
                  A transação possui {prediction.fraud_probability.toFixed(0)}%
                  de chance de ser fraude.
                </Text>
              </Card>
              <Card
                shadow="xs"
                padding="md"
                radius="md"
                withBorder
                className="w-full"
              >
                <CardSection className="p-4">
                  <Text fw={700} fz={"lg"}>
                    Informações sobre o modelo
                  </Text>
                </CardSection>
                <Text>
                  <strong>Classificador:</strong> Random Forest <br />
                  <strong>Recall</strong> 80% <br />
                  <strong>Precisão</strong> 70% <br />
                  <strong>F1-Score</strong> 75% <br />
                  <strong>AUC-Roc</strong> 97% <br />
                </Text>
              </Card>
            </div>
          ) : (
            <Card
              shadow="xs"
              padding="md"
              radius="md"
              withBorder
              className="w-full h-full"
            >
              <Text fw={700} fz="lg" mb="md">
                Resultado da Detecção
              </Text>
              <Text>Escolha um teste para ver o resultado.</Text>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
