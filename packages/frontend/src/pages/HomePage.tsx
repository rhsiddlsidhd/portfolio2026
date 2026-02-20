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

export function HomePage() {
  return (
    <section className="relative">
      <aside
        className={clsx(
          "fixed top-2 right-0 z-10 flex justify-end",
          "max-sm:hidden",
        )}
      >
        <ThemeToggle className="mr-2 cursor-pointer p-4" />
      </aside>
      <main className="bg-background text-foreground">
        <HeroSection user={userData} />
        <AboutSection description={userData.description} />
        <Header className="sticky top-2 border-blue-500 py-2" />
        <SkillsSection skills={skillsData} />
        <ProjectsSection projects={projectsData} allSkills={skillsData} />
        <ContactSection
          email={userData.email}
          phone={userData.phone}
          blogUrl={userData.blogUrl}
        />
      </main>

      <Footer name={userData.name} />
    </section>
  );
}
