import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ProjectsList } from "@/components/organisms/ProjectsList";

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

interface ProjectsSectionProps {
  projects: Project[];
  allSkills: Skill[];
}

export function ProjectsSection({ projects, allSkills }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20">
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
