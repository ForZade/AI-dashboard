"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OverlayContextType {
  open: boolean;
  editingId: string | null;
  openModal: (id?: string | null) => void;
  closeModal: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) throw new Error("useOverlay must be used within OverlayProvider");
  return context;
};

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const openModal = (id: string | null = null) => {
    setEditingId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
  };

  return (
    <OverlayContext.Provider value={{ open, editingId, openModal, closeModal }}>
      {children}
    </OverlayContext.Provider>
  );
};
