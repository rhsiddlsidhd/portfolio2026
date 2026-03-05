import { Badge } from "@/components/atoms/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { imageBaseUrl } from "@/constants/path";
import type { ISkill } from "@/types/skill";
import { cn } from "@/lib/utils";

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
      className={cn(
        "relative flex h-8 shrink-0 items-center justify-center p-0",
        skill.hasIcon ? "aspect-square w-8" : "w-auto min-w-8 px-2",
        className,
      )}
    >
      {!skill.hasIcon ? (
        <span className="text-[8px] leading-none font-bold whitespace-nowrap uppercase">
          {skill.id}
        </span>
      ) : (
        <img
          className="h-4 w-4 object-contain"
          src={`${imageBaseUrl}/skills/${skill.id}.svg`}
          alt={skill.name}
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
