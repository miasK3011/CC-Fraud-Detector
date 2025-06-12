import getDatasets from "@/features/home/api/get-datasets";
import PredictView from "@/features/home/components/predict-view";
import { Card, Container, Text } from "@mantine/core";

export default async function Page() {
  const options = await getDatasets();
  if (options === null) {
    return (
      <Container
        size="lg"
        className="flex flex-col items-center justify-center h-screen py-8"
      >
        <Card padding="xl" radius="md" withBorder className="w-[1000px] h-full">
          <Text variant="h1" fw={700} size="48px">
            CC Fraud Detector
          </Text>
          <p>Detector de transações fraudulentas usando machine learning</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container
      size="lg"
      className="flex flex-col items-center py-8 justify-center h-screen"
    >
      <Card
        padding="xl"
        radius="md"
        withBorder
        className="min-w-5xl min-h-full"
      >
        <div className="mb-6">
          <Text variant="h1" fw={700} size="48px">
            CC Fraud Detector
          </Text>
          <p>Detector de transações fraudulentas usando machine learning</p>
        </div>

        <PredictView options={options} />
      </Card>
    </Container>
  );
}
