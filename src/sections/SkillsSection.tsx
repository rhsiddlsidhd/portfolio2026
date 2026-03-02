import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillsGrid } from "@/components/organisms/SkillsGrid";
import { SkillsFilterProvider } from "@/context/skillsFilter.context";
import type { ISkill } from "@/types/skill";
import ScrollReveal from "@/components/organisms/ScrollReveal";

interface SkillsSectionProps {
  skills: ISkill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative overflow-hidden bg-muted/30 py-24">
      {/* Large decorative index number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 select-none font-mono text-[7rem] font-bold leading-none text-foreground/[0.07] md:text-[9rem]"
      >
        02
      </div>

      {/* Dot grid texture */}
      <div  
        aria-hidden
        className=" pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft glow accent — chart-2(teal) 고정으로 모드 불문 일관성 유지 */}
      <div className="pointer-events-none absolute -left-24 top-1/2 size-[350px] -translate-y-1/2 rounded-full bg-chart-2/20 blur-2xl dark:bg-chart-2/12" />

      <div className="container relative mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeader
            title="Tech Stack"
            subtitle="Technologies I work with"
            align="left"
            className="mb-12"
          />
        </ScrollReveal>

        <SkillsFilterProvider initialValue={undefined}>
          <SkillsGrid skills={skills} groupByCategory />
        </SkillsFilterProvider>
      </div>

      {/* Bottom fade divider */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
      />
    </section>
  );
}
