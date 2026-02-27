import { cn } from "@/lib/utils";
import {
  Dropdown,
  DropdownMenus,
  DropdownOverlay,
  DropdownTrigger,
} from "../atoms/dropdown";
import { ThemeToggle } from "../molecules/themeToggle";
import useMobile from "@/hooks/useMobile";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isMobile } = useMobile();
  const navItems = [
    { label: "기술", href: "#skills" },
    { label: "프로젝트", href: "#projects" },
    { label: "블로그", href: "#blog" },
    { label: "연락처", href: "#contact" },
  ];

  return (
    <header className={cn("relative z-50 mb-12", className)}>
      <nav
        className={cn(
          "border-border bg-accent/50 text-accent-foreground relative z-50 m-auto flex w-fit items-center gap-4 border-2 px-4 py-2 backdrop-blur-2xl max-sm:w-9/10 max-sm:justify-between",
          "rounded-4xl",
        )}
      >
        <DropdownMenus
          menus={navItems}
          className={cn("flex gap-4", isMobile && "hidden")}
        />
        <ThemeToggle
          className={cn("cursor-pointer", !isMobile && "hidden")}
        />
        <DropdownTrigger
          className={cn("cursor-pointer", !isMobile && "hidden")}
        />
      </nav>
      <Dropdown>
        <DropdownMenus menus={navItems} className={cn("space-y-4")} />
      </Dropdown>
      <DropdownOverlay />
    </header>
  );
}
