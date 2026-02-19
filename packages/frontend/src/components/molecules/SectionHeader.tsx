import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl">{subtitle}</p>
      )}
    </div>
  );
}
