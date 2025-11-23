import { create } from "zustand";
import { sendGetRequest } from "../services/requestAdapter";
import type { Installation } from "../interfaces/installations/installation.interface";

interface InstallationState {
	loading: boolean;
  installation: Installation[];
	setLoading: (value: boolean) => void;
  fetchAllInstallation: (params?: string) => Promise<void>;
}

export const useInstallationStore = create<InstallationState>((set) => ({
  loading: false,
  installation: [],
	setLoading: (value) => set({ loading: value }),
  fetchAllInstallation: async (params) => {
		set({ loading: true });
    try {
      const { data } = await sendGetRequest(`/api/installations${params ?? ""}`);
      set({ installation: data?.data });
    } catch (error) {
      console.error("Gagal memuat data instalasi:", error);
    } finally {
			set({ loading: false });
		}
  },
}));