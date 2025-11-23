import type { Installation } from "../installations/installation.interface";

export interface MeasurementLog {
  id: string | number
  installationId: string | number;
  installation: Installation;
  nutrient: number;
  waterVolume: number;
  notes: string;
  type: "Manual" | "Automatic" | "Triggered"
  createdAt?: string;
  updatedAt?: string;
}

export interface FormMeasurementLog {
  installationId: string,
  plantId: string,
  qty: number,
  notes: string
}