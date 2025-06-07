import { Tabs, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Model } from "../types";

interface PredictTabsProps {
  activeTab: Model;
  setActiveTab: Dispatch<SetStateAction<Model>>;
}

export default function PredictTabs({
  activeTab = "rf-under",
  setActiveTab,
}: PredictTabsProps) {
  const handleTabChange = (value: string | null) => {
    setActiveTab(value as Model);
  };

  return (
    <>
      <Text fw={700} fz="xl">
        Modelos disponíveis
      </Text>
      <Tabs className="mb-4" value={activeTab} onChange={handleTabChange} variant="outline">
        <Tabs.List>
          <Tabs.Tab value="rf-under">Random Forest Undersampling</Tabs.Tab>
          <Tabs.Tab value="rf-over">Random Forest SMOTE</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
}
