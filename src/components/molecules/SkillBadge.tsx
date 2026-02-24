import { Badge } from "@/components/atoms/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { imageBaseUrl } from "@/constants/path";
import type { ISkill } from "@/types/skill";
import clsx from "clsx";

interface SkillBadgeProps {
  skill: ISkill;
  showTooltip?: boolean;
  className?: string;
}

export function SkillBadge({
  skill,
  showTooltip = true,
  className,
}: SkillBadgeProps) {
  const badge = (
    <Badge
      data-slot="badge"
      variant="secondary"
      className={clsx("p-2", className)}
    >
      <img
        className="aspect-square w-6"
        src={`${imageBaseUrl}/skills/${skill.id}.svg`}
      />
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{skill.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
