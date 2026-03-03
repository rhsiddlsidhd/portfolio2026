import { SectionSeparator } from "@/components/molecules";
import { HeroContent } from "@/components/organisms/HeroContent";
import type { IUser } from "@/types/user";

interface HeroSectionProps {
  user: IUser;
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
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
        <div className="absolute -right-32 -top-32 size-[500px] rounded-full bg-chart-2/25 blur-2xl dark:bg-chart-2/15" />
        {/* Glow — bottom left */}
        <div className="absolute -bottom-24 -left-24 size-[350px] rounded-full bg-chart-1/20 blur-2xl dark:bg-chart-1/12" />
        {/* Glow — center accent */}
        <div className="absolute left-1/3 top-1/4 size-[260px] rounded-full bg-chart-2/10 blur-3xl dark:bg-chart-2/8" />
        {/* Bottom divider */}
        <div className="absolute bottom-0 left-1/2 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
      </div>

      <HeroContent user={user} />

      <SectionSeparator />

    </section>
  );
}
