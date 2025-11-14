import { create } from "zustand";

interface UIState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  theme: "dark",
  setTheme: (theme: "light" | "dark") => set({ theme }),

  currentProjectId: null,
  setCurrentProjectId: (id: string | null) => set({ currentProjectId: id }),
}));
