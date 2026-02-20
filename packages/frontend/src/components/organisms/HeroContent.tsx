import { ProfileHeader } from "@/components/molecules/ProfileHeader";
import { Button } from "@/components/atoms/button";
import { ArrowDown, Mail } from "lucide-react";
import type { IUser } from "../../../../shared/src/types/user";

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
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8">
          {/* Profile Header */}
          <ProfileHeader name={user.name} headline={user.headline} />

          {/* CTA Buttons */}
          {showCTA && (
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button size="lg" onClick={scrollToContact}>
                <Mail />
                Contact Me
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToAbout}>
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
