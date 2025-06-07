"use client";
import { useApiMutation } from "@hooks/useApiMutation";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { PredictionResponse } from "../types"; // Importe o tipo correto

interface PredictFormValues {
  features: number[];
}

interface PredictFormProps {
  features: number[];
  setPrediction: (prediction: PredictionResponse | null) => void;
  onError: (error: string | null) => void;
  model: string;
}

export default function PredictForm({
  features,
  setPrediction,
  onError,
  model,
}: PredictFormProps) {
  const { mutate, isLoading } = useApiMutation<
    PredictionResponse,
    { features: number[] }
  >();

  const form = useForm<PredictFormValues>({
    initialValues: { features },
  });

  useEffect(() => {
    form.setValues({ features });
  }, [features]);

  const handleSubmit = async (values: PredictFormValues) => {
    setPrediction(null);
    onError(null);

    await mutate(
      `/predict/${model}/`,
      { features: values.features },
      {
        onSuccess: (data) => {
          setPrediction(data);
        },
        onError: (err) => {
          onError(err.detail || "Ocorreu um erro na predição.");
        },
      }
    );
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="mt-6"
    >
      <Button type="submit" loading={isLoading}>
        Detectar
      </Button>
    </form>
  );
}
