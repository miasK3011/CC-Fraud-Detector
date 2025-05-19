"use client";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

interface PredictFormValues {
  features: number[];
}

interface PredictFormProps {
  features: number[];
  setPrediction: (prediction: any) => void;
}

export default function PredictForm({
  features,
  setPrediction,
}: PredictFormProps) {
  const form = useForm<PredictFormValues>({
    initialValues: {
      features: features,
    },
  });

  useEffect(() => {
    console.log("Features recebidas no PredictForm:", features);
    form.setValues({ features });
  }, [features]);

  const handleSubmit = async (values: PredictFormValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            features: values.features,
          }),
        }
      );

      if (response.ok) {
        const prediction = await response.json();
        setPrediction(prediction);
      } else {
        notifications.show({
          title: "Error",
          message: "Failed to fetch prediction: " + response.statusText,
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      notifications.show({
        title: "Error",
        message: "An error occurred during prediction.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex gap-4">
      <Button type="submit">Predict</Button>
    </form>
  );
}
