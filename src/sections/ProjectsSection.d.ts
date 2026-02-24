import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
interface ProjectsSectionProps {
    projects: IProject[];
    allSkills: ISkill[];
}
export declare function ProjectsSection({ projects, allSkills }: ProjectsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
