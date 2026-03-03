import { ProfileHeader } from "@/components/molecules/ProfileHeader";
import { Button } from "@/components/atoms/button";
import { ArrowDown, Mail } from "lucide-react";
import type { IUser } from "@/types/user";
import { scrollToSection } from "@/lib/utils";

interface HeroContentProps {
  user: IUser;
  showCTA?: boolean;
  className?: string;
}

export function HeroContent({
  user,
  showCTA = true,
  className,
}: HeroContentProps) {
  return (
    <div className={className}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8">
          {/* Profile Header — animates in first */}
          <ProfileHeader
            name={user.name}
            job={user.job}
            headline={user.headline}
            id={user.id}
          />

          {/* CTA Buttons — delayed entrance */}
          {showCTA && (
            <div
              className="flex flex-col items-center gap-4 sm:flex-row animate-[heroEnter_0.7s_ease-out_both] [animation-delay:480ms]"
            >
              <Button size="lg" onClick={() => scrollToSection("contact-section")}>
                <Mail />
                Contact Me
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection("about-section")}>
                <ArrowDown />
                Learn More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
