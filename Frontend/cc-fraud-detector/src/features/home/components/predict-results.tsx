import { Badge, Card, CardSection, Table, Text } from "@mantine/core";
import { Dataset, PredictionResponse } from "../types";

interface PredictResultsProps {
  dataset: Dataset | null;
  prediction: PredictionResponse;
}

export default function PredicResults({
  dataset,
  prediction,
}: PredictResultsProps) {
  return (
    <div className="flex gap-4">
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
                <div className="flex items-center gap-2">
                  <Text fw={700} fz="lg">
                    Resultado da Detecção
                  </Text>
                  {prediction.is_fraud == dataset?.dataset.is_fraud ? (
                    <Badge color="green">Predição correta</Badge>
                  ) : (
                    <Badge color="red">Predição incorreta</Badge>
                  )}
                </div>
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
                A transação possui {prediction.fraud_probability.toFixed(0)}% de
                chance de ser fraude.
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
                <strong>Classificador:</strong> {prediction.model_name} <br />
                <strong>Recall</strong> {prediction.recall * 100}% <br />
                <strong>Precisão</strong> {prediction.precision * 100}% <br />
                <strong>F1-Score</strong> {prediction.f1_score * 100}% <br />
                <strong>AUC-Roc</strong> {prediction.auc_roc * 100}% <br />
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
  );
}
