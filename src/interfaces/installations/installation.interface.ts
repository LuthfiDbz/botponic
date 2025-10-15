import type { Planting } from "../planting/planting.interface";

export interface Installation {
  id: string | number;
  userId?: string;
  name: string;
  type: string;
  model: 'NFT' | 'DFT';
  size: string;
  capacity: number;
  latestTemperature: number;
  latestPH: number;
  latestHumidity: number;
  latestNutrients: number;
  latestWaterVolume: number,
  notes?: string;
  status: 0 | 1 | 2;
  createdAt?: string;
  updatedAt?: string;
  plantingCount: number;
  image: string;
  plantings?: Planting[]
}

export interface InstallationSensor {
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

export interface FormInstallationSensor {
  id?: string | number
  nutrient: number;
  waterVolume: number;
  notes: string;
  type: "Manual" | "Automatic" | "Triggered"
}
