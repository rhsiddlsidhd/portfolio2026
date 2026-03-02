import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProjectsList } from "@/components/organisms/ProjectsList";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import ScrollReveal from "@/components/organisms/ScrollReveal";

interface ProjectsSectionProps {
  projects: IProject[];
  allSkills: ISkill[];
}

export function ProjectsSection({ projects, allSkills }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative overflow-hidden py-24">
      {/* Large decorative index number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 select-none font-mono text-[7rem] font-bold leading-none text-foreground/[0.07] md:text-[9rem]"
      >
        03
      </div>

      {/* Soft glow — left side */}
      <div className="pointer-events-none absolute -left-24 top-1/2 size-[400px] -translate-y-1/2 rounded-full bg-chart-2/20 blur-2xl" />

      <div className="container relative mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeader
            title="Projects"
            subtitle="Things I've built"
            align="left"
            className="mb-12"
          />
        </ScrollReveal>

        <ProjectsList projects={projects} allSkills={allSkills} />
      </div>

      {/* Bottom fade divider */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
      />
    </section>
  );
}
