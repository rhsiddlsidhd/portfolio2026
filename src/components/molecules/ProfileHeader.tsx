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
  console.log({ newHeadLine });
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Avatar */}

        <Avatar className="size-24 md:size-32">
          <AvatarImage
            src={`${imageBaseUrl}/users/${id}.webp`}
            alt={name}
            className="object-cover"
          />
          <AvatarFallback>
            <User className="text-muted-foreground size-10" />
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <div className="space-y-2 sm:max-w-3/4">
          {/* Headline */}
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl">
            {newHeadLine.map((word, i) => (
              <span className="mr-1 inline-block" key={`${word}-${i}`}>
                {word}
              </span>
            ))}
          </p>
          <p className="text-chart-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {name}
            <span className="text-foreground font-medium">입니다</span>
          </p>
        </div>
      </div>
    </div>
  );
}
