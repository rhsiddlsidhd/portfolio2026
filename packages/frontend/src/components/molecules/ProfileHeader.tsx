import { imageBaseUrl } from "@/constants/path";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  id: string;
  name: string;
  headline: string;
  className?: string;
}

export function ProfileHeader({
  id,
  name,
  headline,
  className,
}: ProfileHeaderProps) {
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
        <div className="space-y-2">
          <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {name}
          </h1>

          {/* Headline */}
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl">
            {headline}
          </p>
        </div>
      </div>
    </div>
  );
}
