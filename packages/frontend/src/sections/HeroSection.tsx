import { HeroContent } from "@/components/organisms/HeroContent";
import type { IUser } from "../../../shared/src/types/user";

interface HeroSectionProps {
  user: IUser;
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <section className="min-h-screen">
      <HeroContent user={user} />
    </section>
  );
}
