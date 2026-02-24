import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
type ThumbnailSrc = {
    webp: string;
    jpg: string;
    default: string;
};
export declare const createProjectThumbnailSrc: (title: string) => ThumbnailSrc;
type ProjectCardProps = {
    project: IProject;
    allSkills: ISkill[];
    className?: string;
    inView?: boolean;
    onLoad?: () => void;
};
/** 프로젝트 정보와 사용 기술을 카드 형태로 표시하는 컴포넌트 */
export declare function ProjectCard({ project, allSkills, className, inView, onLoad, }: ProjectCardProps): import("react/jsx-runtime").JSX.Element;
export {};
