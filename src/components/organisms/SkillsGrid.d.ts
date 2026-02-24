import type { ISkill } from "@/types/skill";
interface SkillsGridProps {
    skills: ISkill[];
    groupByCategory?: boolean;
    className?: string;
}
export declare function SkillsGrid({ skills, groupByCategory, className, }: SkillsGridProps): import("react/jsx-runtime").JSX.Element;
export {};
