import useScrollReveal from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import type { IntersectionOptions } from "react-intersection-observer";

type RevealVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "scale-up"
  | "fade";

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: string;
  triggerOnce?: boolean;
  threshold?: number;
  className?: string;
  options?: IntersectionOptions;
}

const Reveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  distance = "24px",
  triggerOnce = true,
  threshold,
  className,
  options,
}: RevealProps) => {
  // undefined인 값은 hooks의 기본값을 유지하도록 필터링
  const revealOptions = useMemo(() => {
    const combined = { 
      triggerOnce, 
      threshold, 
      ...options 
    };
    return Object.fromEntries(
      Object.entries(combined).filter(([, v]) => v !== undefined)
    ) as IntersectionOptions;
  }, [triggerOnce, threshold, options]);

  const { ref, inView } = useScrollReveal(revealOptions);

  const variantStyles = useMemo(() => {
    const styles = {
      initial: "",
      active: "opacity-100 translate-x-0 translate-y-0 scale-100",
    };

    switch (variant) {
      case "fade-up":
        styles.initial = "opacity-0 translate-y-[var(--reveal-distance)]";
        break;
      case "fade-down":
        styles.initial = "opacity-0 translate-y-[calc(var(--reveal-distance)*-1)]";
        break;
      case "fade-left":
        styles.initial = "opacity-0 translate-x-[var(--reveal-distance)]";
        break;
      case "fade-right":
        styles.initial = "opacity-0 translate-x-[calc(var(--reveal-distance)*-1)]";
        break;
      case "zoom-in":
        styles.initial = "opacity-0 scale-95";
        break;
      case "scale-up":
        styles.initial = "opacity-0 scale-90 translate-y-4";
        break;
      case "fade":
        styles.initial = "opacity-0";
        break;
      default:
        styles.initial = "opacity-0 translate-y-6";
    }
    return styles;
  }, [variant]);

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        "--reveal-distance": distance 
      } as React.CSSProperties}
      className={cn(
        "motion-safe:transition-all motion-safe:ease-out will-change-transform",
        inView ? variantStyles.active : variantStyles.initial,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Reveal;
