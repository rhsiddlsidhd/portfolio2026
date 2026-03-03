import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProjectsList } from "@/components/organisms/ProjectsList";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import ScrollReveal from "@/components/organisms/ScrollReveal";
import { SectionLayout } from "./SectionLayout";

interface ProjectsSectionProps {
  projects: IProject[];
  allSkills: ISkill[];
}

export function ProjectsSection({ projects, allSkills }: ProjectsSectionProps) {
  return (
    <SectionLayout id="projects-section" index="03">
      {/* Soft glow — left side */}
      <div className="pointer-events-none absolute -left-24 top-1/2 size-[400px] -translate-y-1/2 rounded-full bg-chart-2/20 blur-2xl" />

      <div className="container relative mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeader
            title="프로젝트"
            subtitle="직접 설계하고 구현한 결과물들입니다"
            align="left"
            className="mb-12"
          />
        </ScrollReveal>

        <ProjectsList projects={projects} allSkills={allSkills} />
      </div>
    </SectionLayout>
  );
}
