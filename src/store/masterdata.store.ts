import { create } from "zustand";
import type { Plants } from "../interfaces/master-data/plants.interface";
import { sendGetRequest } from "../services/requestAdapter";

interface MasterDataState {
  plants: Plants[];
  fetchAllPlants: () => Promise<void>;
}

export const useMasterDataStore = create<MasterDataState>((set) => ({
  plants: [],
  fetchAllPlants: async () => {
    try {
      const { data } = await sendGetRequest('/api/plants');
      set({ plants: data?.data });
    } catch (error) {
      console.error("Gagal memuat data plants:", error);
    }
  },
}));