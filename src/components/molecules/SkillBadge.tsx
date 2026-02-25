import { Badge } from "@/components/atoms/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { imageBaseUrl } from "@/constants/path";
import type { ISkill } from "@/types/skill";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [hasError, setHasError] = useState(false);

  const badge = (
    <Badge
      data-slot="badge"
      variant="secondary"
      className={cn("p-2", className)}
    >
      {hasError ? (
        <span className="h-6 text-[10px] font-bold uppercase leading-none flex items-center">
          {skill.id}
        </span>
      ) : (
        <img
          className="aspect-square w-6"
          src={`${imageBaseUrl}/skills/${skill.id}.svg`}
          alt={skill.name}
          onError={() => setHasError(true)}
        />
      )}
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
