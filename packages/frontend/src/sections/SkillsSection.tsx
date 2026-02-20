import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillsGrid } from "@/components/organisms/SkillsGrid";
import { SkillsFilterProvider } from "@/context/skillsFilter.context";
import type { ISkill } from "../../../shared/src/types/skill";

interface SkillsSectionProps {
  skills: ISkill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Tech Stack"
          subtitle="Technologies I work with"
          className="mb-12"
        />

        <SkillsFilterProvider initialValue={undefined}>
          <SkillsGrid skills={skills} groupByCategory />
        </SkillsFilterProvider>
      </div>
    </section>
  );
}
