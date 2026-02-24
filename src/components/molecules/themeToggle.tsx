import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../atoms/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/** 라이트/다크 모드를 전환하는 토글 버튼 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className={cn(className)}
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
