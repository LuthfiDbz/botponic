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
  measurementDate: string;
  notes?: string;
  status: 0 | 1 | 2;
  createdAt?: string;
  updatedAt?: string;
  plantCount: number;
  image: string;
  connectionStatus: 'connected' | 'disconnected';
}

export interface InstallationSensor {
  id: string | number
  installationId?: string;
  installation?: Installation;
  nutrient: number;
  waterVolume: number;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormInstallationSensor {
  id?: string | number
  nutrient: number;
  waterVolume: number;
  notes: string;
}
