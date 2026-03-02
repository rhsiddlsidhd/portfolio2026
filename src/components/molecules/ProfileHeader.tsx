import { imageBaseUrl } from "@/constants/path";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  id: string;
  name: string;
  headline: string;
  className?: string;
}

const createHeadline = (headline: string): string[] => {
  return headline.split(" ");
};

export function ProfileHeader({
  id,
  name,
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
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-chart-2/30 blur-xl dark:bg-chart-2/15" />
          <Avatar className="size-24 ring-2 ring-chart-2/50 ring-offset-2 ring-offset-background md:size-32">
            <AvatarImage
              src={`${imageBaseUrl}/users/${id}.webp`}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback>
              <User className="text-muted-foreground size-10" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Text group */}
        <div className="space-y-2 sm:max-w-3/4">
          {/* Headline — delayed */}
          <p className="text-muted-foreground text-lg animate-[heroEnter_0.7s_ease-out_both] [animation-delay:180ms] md:text-xl lg:text-2xl">
            {newHeadLine.map((word, i) => (
              <span className="mr-1 inline-block" key={`${word}-${i}`}>
                {word}
              </span>
            ))}
          </p>

          {/* Name — most delayed */}
          <p className="text-chart-2 text-4xl font-bold tracking-tight animate-[heroEnter_0.7s_ease-out_both] [animation-delay:330ms] md:text-5xl lg:text-6xl">
            {name}
            <span className="text-foreground font-medium">입니다</span>
          </p>
        </div>
      </div>
    </div>
  );
}
