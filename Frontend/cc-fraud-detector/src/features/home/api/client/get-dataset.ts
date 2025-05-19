'use client'
import { Dataset } from "../../types";

export async function getDatasetById(id: number | string): Promise<Dataset | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/datasets/${id}/`,);
        const data = await response.json() as Dataset;
        return data;
    } catch (error) {
        console.error("Error fetching datasets:", error);
        return null;
    }
}