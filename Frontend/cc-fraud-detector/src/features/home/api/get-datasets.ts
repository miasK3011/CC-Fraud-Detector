import { env } from "@lib/env";
import { DatasetOptions, DatasetsResponse } from "../types";


export default async function getDatasets(): Promise<DatasetOptions | null> {
    try {
        const response = await fetch(env.NEXT_PUBLIC_API_URL + "/datasets/");
        const data = await response.json() as DatasetsResponse;
        const options = data.datasets.map((dataset) => ({
            label: dataset.label,
            value: dataset.id.toString(),
        }));
        return options;
    } catch (error) {
        console.error("Error fetching datasets:", error);
        return null;
    }
}

