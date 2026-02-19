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
        <p className="text-center text-muted-foreground">
          No projects available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
