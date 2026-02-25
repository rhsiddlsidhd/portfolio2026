import { ProjectCard } from "@/components/molecules/ProjectCard";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import ScrollReveal from "./ScrollReveal";
import { STAGGER_DELAY } from "@/constants/ui";

interface ProjectsListProps {
  projects: IProject[];
  allSkills: ISkill[];
  className?: string;
}

export function ProjectsList({
  projects,
  allSkills,
  className,
}: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className={className}>
        <p className="text-muted-foreground text-center">
          No projects available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="scroll-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {projects.map((project, index) => (
            <ScrollReveal
              waitForImg={true}
              delay={index * STAGGER_DELAY}
              key={project.id}
              options={{ threshold: 0, rootMargin: "0px 100px 0px 100px" }}
            >
              {({ inView, onLoad }) => (
                <ProjectCard
                  project={project}
                  allSkills={allSkills}
                  className="w-[70vw] shrink-0 snap-start pt-0"
                  inView={inView}
                  onLoad={onLoad}
                />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden gap-6 sm:grid-cols-2 md:grid lg:grid-cols-4">
        {projects.map((project, index) => (
          <ScrollReveal
            waitForImg={false}
            delay={index * STAGGER_DELAY}
            key={project.id}
            options={{ threshold: 0.5, rootMargin: "0px 0px 200px 0px" }}
          >
            {({ inView, onLoad }) => (
              <ProjectCard
                project={project}
                allSkills={allSkills}
                className="pt-0"
                inView={inView}
                onLoad={onLoad}
              />
            )}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
