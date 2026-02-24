import type { ISkill } from "@/types/skill";
interface SkillBadgeProps {
    skill: ISkill;
    showTooltip?: boolean;
    className?: string;
}
export declare function SkillBadge({ skill, showTooltip, className, }: SkillBadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
