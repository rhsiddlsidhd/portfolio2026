import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillsGrid } from "@/components/organisms/SkillsGrid";

interface Skill {
  id: string;
  name: string;
  category: string;
  thumbnailUrl?: string | null;
}

interface SkillsSectionProps {
  skills: Skill[];
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

        <SkillsGrid skills={skills} groupByCategory />
      </div>
    </section>
  );
}
