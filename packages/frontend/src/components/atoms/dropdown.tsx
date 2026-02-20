import { useEffect } from "react";
import { Menu, XIcon } from "lucide-react";
import clsx from "clsx";
import { useDropdownStore } from "@/store/dropdown.store";

interface DropdownTriggerProps {
  className?: string;
}

const DropdownTrigger = ({ className }: DropdownTriggerProps) => {
  const toggleDropdown = useDropdownStore((state) => state.toggleDropdown);
  const isOpen = useDropdownStore((state) => state.isOpen);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  return (
    <div className={clsx("relative h-4 w-4 p-2", className)}>
      <XIcon
        onClick={toggleDropdown}
        className={clsx(
          "absolute top-0 left-0 h-full w-full transition-opacity duration-300",
          !isOpen && "pointer-events-none opacity-0",
        )}
      />

      <Menu
        onClick={toggleDropdown}
        className={clsx(
          "absolute top-0 left-0 h-full w-full duration-300",
          isOpen && "pointer-events-none opacity-0",
        )}
      />
    </div>
  );
};

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useDropdownStore((state) => state.isOpen);

  return (
    <div
      className={clsx(
        "bg-accent/50 absolute top-1/3 left-1/2 z-50 w-9/10 origin-top-right -translate-x-1/2 translate-y-1/3 rounded-2xl px-2 py-4 backdrop-blur-2xl duration-300",
        !isOpen && "scale-0",
      )}
    >
      {children}
    </div>
  );
};

type Menus = {
  label: string;
  href: string;
}[];

interface DropdownMenusProps {
  menus: Menus;
  className?: string;
}

const DropdownMenus = ({ menus, className }: DropdownMenusProps) => {
  const closeDropdown = useDropdownStore((state) => state.closeDropdown);
  return (
    <ul className={clsx(className)}>
      {menus.map((menu) => (
        <li
          className={clsx(
            "hover:text-chart-5 scale-95 cursor-pointer transition-all duration-200 ease-out hover:scale-100",
          )}
          key={menu.label}
        >
          <a onClick={closeDropdown} href={menu.href}>
            {menu.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

const DropdownOverlay = () => {
  const isOpen = useDropdownStore((state) => state.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        isOpen &&
          "bg-background/50 fixed top-0 left-0 z-40 h-full w-full backdrop-blur-xs",
      )}
    />
  );
};

export { DropdownTrigger, Dropdown, DropdownMenus, DropdownOverlay };
