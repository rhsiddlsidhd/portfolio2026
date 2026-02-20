import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProjectsList } from "@/components/organisms/ProjectsList";
import type { IProject } from "../../../shared/src/types/project";
import type { ISkill } from "../../../shared/src/types/skill";

interface ProjectsSectionProps {
  projects: IProject[];
  allSkills: ISkill[];
}

export function ProjectsSection({ projects, allSkills }: ProjectsSectionProps) {
  return (
    <section id="projects" className="overflow-hidden py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader
          title="Projects"
          subtitle="Things I've built"
          className="mb-12"
        />

        <ProjectsList projects={projects} allSkills={allSkills} />
      </div>
    </section>
  );
}
