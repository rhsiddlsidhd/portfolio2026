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
    thumbnailUrl?: string | null;
  };
  showTooltip?: boolean;
  className?: string;
}

export function SkillBadge({
  skill,
  showTooltip = true,
  className,
}: SkillBadgeProps) {
  const badge = (
    <Badge variant="secondary" className={className}>
      {skill.name}
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{skill.category}</p>
      </TooltipContent>
    </Tooltip>
  );
}
