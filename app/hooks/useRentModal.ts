import { create } from "zustand";

type RentModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useRentModal = create<RentModalStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => {
      set({ isOpen: true });
    },
    onClose: () => {
      set({ isOpen: false });
    },
  };
});
