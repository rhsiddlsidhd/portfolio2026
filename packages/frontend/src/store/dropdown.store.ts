import { create } from "zustand";

type States = {
  isOpen: boolean;
};

type Actions = {
  toggleDropdown: () => void;
  openDropdown: () => void;
  closeDropdown: () => void;
};

const useDropdownStore = create<States & Actions>((set) => ({
  isOpen: false, // 초기 상태

  toggleDropdown: () => set((state) => ({ isOpen: !state.isOpen })),
  openDropdown: () => set({ isOpen: true }),
  closeDropdown: () => set({ isOpen: false }),
}));

export { useDropdownStore };
