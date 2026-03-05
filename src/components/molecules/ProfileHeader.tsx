import { imageBaseUrl } from "@/constants/path";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Badge } from "../atoms/badge";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  id: string;
  name: string;
  job: string;
  headline: string;
  className?: string;
}

const createHeadline = (headline: string): string[] => {
  return headline.split(" ");
};

export function ProfileHeader({
  id,
  name,
  job,
  headline,
  className,
}: ProfileHeaderProps) {
  const newHeadLine = createHeadline(headline);

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Avatar with glow ring — animates first */}
        <div className="relative animate-[heroEnter_0.7s_ease-out_both]">
          {/* Glow behind avatar */}
          <div className="bg-chart-2/30 dark:bg-chart-2/15 absolute inset-0 -z-10 scale-110 rounded-full blur-xl" />
          <Avatar className="ring-chart-2/50 ring-offset-background size-24 ring-2 ring-offset-2 md:size-32">
            <AvatarImage
              src={`${imageBaseUrl}/users/${id}.webp`}
              alt={name}
              className="object-cover"
              fetchPriority="high"
              loading="eager"
            />
            <AvatarFallback>
              <User className="text-muted-foreground size-10" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Text group */}
        <div className="flex flex-col items-center space-y-4">
          {/* Headline — First text element after avatar */}
          <p className="text-muted-foreground animate-[heroEnter_0.7s_ease-out_both] text-lg [animation-delay:150ms] md:text-xl lg:text-2xl">
            {newHeadLine.map((word, i) => (
              <span className="mr-1 inline-block" key={`${word}-${i}`}>
                {word}
              </span>
            ))}
          </p>

          {/* Job badge — Connecting headline and name */}
          <div className="animate-[heroEnter_0.7s_ease-out_both] [animation-delay:300ms]">
            <Badge
              variant="outline"
              className="border-chart-2 text-chart-2 px-3 py-1 text-sm font-medium"
            >
              {job}
            </Badge>
          </div>

          {/* Name — Final subject */}
          <p className="text-chart-2 animate-[heroEnter_0.7s_ease-out_both] text-4xl font-bold tracking-tight [animation-delay:450ms] md:text-5xl lg:text-6xl">
            {name}
            <span className="text-foreground font-medium">입니다</span>
          </p>
        </div>
      </div>
    </div>
  );
}
