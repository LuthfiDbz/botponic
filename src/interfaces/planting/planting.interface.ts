import type { Installation } from "../installations/installation.interface";
import type { Plants } from "../master-data/plants.interface";

export interface Planting {
  id: string;
  installationId?: string;
  installation: Installation;
  plantId?: string;
  plant: Plants;
  name: string;
  plantDate: string;
  harvestDate: string;
  growthStage: 'benih' | 'vegetatif' | 'generatif';
  qty: number,
  createdAt?: string;
  updatedAt?: string;
}