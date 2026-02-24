type DropdownTriggerProps = {
    className?: string;
};
declare const DropdownTrigger: ({ className }: DropdownTriggerProps) => import("react/jsx-runtime").JSX.Element;
declare const Dropdown: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
type Menus = {
    label: string;
    href: string;
}[];
type DropdownMenusProps = {
    menus: Menus;
    className?: string;
};
declare const DropdownMenus: ({ menus, className }: DropdownMenusProps) => import("react/jsx-runtime").JSX.Element;
declare const DropdownOverlay: () => import("react/jsx-runtime").JSX.Element;
export { DropdownTrigger, Dropdown, DropdownMenus, DropdownOverlay };
