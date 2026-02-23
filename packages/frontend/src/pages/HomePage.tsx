import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from "@/sections";
import userData from "../../../shared/data/user.json";
import skillsData from "../../../shared/data/skills.json";
import projectsData from "../../../shared/data/projects.json";
import { ThemeToggle } from "@/components/molecules/themeToggle";
import clsx from "clsx";
import ScrollReveal from "@/components/organisms/ScrollReveal";

export function HomePage() {
  return (
    <section className="relative">
      <aside
        className={clsx(
          "fixed top-2 right-0 z-60 flex justify-end",
          "max-sm:hidden",
        )}
      >
        <ThemeToggle className="mr-2 cursor-pointer p-4" />
      </aside>
      <main className="bg-background text-foreground">
        <HeroSection user={userData} />
        <ScrollReveal>
          <AboutSection description={userData.description} />
        </ScrollReveal>
        <Header className="sticky top-2 py-2" />

        <SkillsSection skills={skillsData} />

        <ProjectsSection projects={projectsData} allSkills={skillsData} />
        <ScrollReveal>
          <ContactSection
            email={userData.email}
            phone={userData.phone}
            blogUrl={userData.blogUrl}
          />
        </ScrollReveal>
      </main>

      <Footer name={userData.name} />
    </section>
  );
}
