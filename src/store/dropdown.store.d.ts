type States = {
    isOpen: boolean;
};
type Actions = {
    toggleDropdown: () => void;
    openDropdown: () => void;
    closeDropdown: () => void;
};
declare const useDropdownStore: import("zustand").UseBoundStore<import("zustand").StoreApi<States & Actions>>;
export { useDropdownStore };
