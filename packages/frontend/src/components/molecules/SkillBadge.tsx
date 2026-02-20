import { Badge } from "@/components/atoms/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

interface SkillBadgeProps {
  skill: {
    id: string;
    name: string;
    category: string;
  };
  showTooltip?: boolean;
  className?: string;
}

const imageBaseUrl = "/images/skills";

export function SkillBadge({
  skill,
  showTooltip = true,
  className,
}: SkillBadgeProps) {
  console.log(skill.id);
  const badge = (
    <Badge data-slot="badge" variant="secondary" className={className}>
      <img
        className="aspect-square w-8"
        src={`${imageBaseUrl}/${skill.id}.svg`}
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
