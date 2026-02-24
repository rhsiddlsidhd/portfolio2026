import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
interface ProjectsListProps {
    projects: IProject[];
    allSkills: ISkill[];
    className?: string;
}
export declare function ProjectsList({ projects, allSkills, className, }: ProjectsListProps): import("react/jsx-runtime").JSX.Element;
export {};
