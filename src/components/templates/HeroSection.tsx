import { HeroContent } from "@/components/organisms/HeroContent";
import type { IUser } from "@/types/user";

interface HeroSectionProps {
  user: IUser;
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Decorative background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.055] dark:opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glow — top right */}
        <div className="bg-chart-2/25 dark:bg-chart-2/15 absolute -top-32 -right-32 size-125 rounded-full blur-2xl" />
        {/* Glow — bottom left */}
        <div className="bg-chart-1/20 dark:bg-chart-1/12 absolute -bottom-24 -left-24 size-87.5 rounded-full blur-2xl" />
        {/* Glow — center accent */}
        <div className="bg-chart-2/10 dark:bg-chart-2/8 absolute top-1/4 left-1/3 size-65 rounded-full blur-3xl" />
        {/* Bottom fade — blends into next section */}
        <div className="from-background absolute right-0 bottom-0 left-0 h-48 bg-linear-to-t to-transparent" />
      </div>

      <HeroContent user={user} />
    </section>
  );
}
