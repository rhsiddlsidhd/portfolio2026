import { ProjectCard } from "@/components/molecules/ProjectCard";

interface Skill {
  id: string;
  name: string;
  category: string;
  thumbnailUrl?: string | null;
}

interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  skills: string[];
  thumbnailUrl?: string | null;
  deployUrl?: string | null;
  githubUrl?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  role?: string;
}

interface ProjectsListProps {
  projects: Project[];
  allSkills: Skill[];
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
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              allSkills={allSkills}
              className="w-[70vw] shrink-0 snap-start pt-0"
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden gap-6 sm:grid-cols-2 md:grid lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            allSkills={allSkills}
            className="pt-0"
          />
        ))}
      </div>
    </div>
  );
}
