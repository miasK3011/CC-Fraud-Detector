import { Tabs, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface PredictTabsProps {
  activeTab?: string | null;
  setActiveTab: Dispatch<SetStateAction<string | null>>;
}

export default function PredictTabs({
  activeTab = "rf",
  setActiveTab,
}: PredictTabsProps) {
  return (
    <>
      <Text fw={700} fz="xl">
        Modelos disponíveis
      </Text>
      <Tabs className="mb-4" value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="rf">Random Forest</Tabs.Tab>
          <Tabs.Tab value="xgb">XGBoost</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
}
