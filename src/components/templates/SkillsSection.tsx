import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillsGrid } from "@/components/organisms/SkillsGrid";
import { SkillsFilterProvider } from "@/context/skillsFilter.context";
import type { ISkill } from "@/types/skill";
import Reveal from "@/components/organisms/Reveal";
import { SectionLayout } from "../layout/SectionLayout";

interface SkillsSectionProps {
  skills: ISkill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <SectionLayout id="skills-section" index="02" className="bg-muted/30">
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft glow accent — chart-2(teal) 고정으로 모드 불문 일관성 유지 */}
      <div className="bg-chart-2/20 dark:bg-chart-2/12 pointer-events-none absolute top-1/2 -left-24 size-87.5 -translate-y-1/2 rounded-full blur-2xl" />

      <div className="relative container mx-auto px-4 md:px-8">
        <Reveal>
          <SectionHeader
            title="기술 스택"
            subtitle="현재 활용 중인 주요 기술과 도구들입니다"
            align="left"
            className="mb-12"
          />
        </Reveal>

        <SkillsFilterProvider initialValue={undefined}>
          <SkillsGrid skills={skills} groupByCategory />
        </SkillsFilterProvider>
      </div>
    </SectionLayout>
  );
}
