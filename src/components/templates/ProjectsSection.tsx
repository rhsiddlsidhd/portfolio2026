import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import Reveal from "@/components/organisms/Reveal";
import { SectionLayout } from "./SectionLayout";
import ProjectsList from "../organisms/ProjectsList";



interface ProjectsSectionProps {
  projects: IProject[];
  allSkills: ISkill[];
}

function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}

export function ProjectsSection({ projects, allSkills }: ProjectsSectionProps) {
  return (
    <SectionLayout id="projects-section" index="03">
      {/* Soft glow — left side */}
      <div className="pointer-events-none absolute -left-24 top-1/2 size-[400px] -translate-y-1/2 rounded-full bg-chart-2/20 blur-2xl" />

      <div className="container relative mx-auto px-4 md:px-8">
        <Reveal>
          <SectionHeader
            title="프로젝트"
            subtitle="직접 설계하고 구현한 결과물들입니다"
            align="left"
            className="mb-12"
          />
        </Reveal>
        <ProjectsList projects={projects} allSkills={allSkills} />
      </div>
    </SectionLayout>
  );
}
