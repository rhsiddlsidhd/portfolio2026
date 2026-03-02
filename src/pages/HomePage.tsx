import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from "@/sections";
import userData from "@/data/user.json";
import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import { ThemeToggle } from "@/components/molecules/themeToggle";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/organisms/ScrollReveal";
import { Outlet } from "react-router";
import { AIUsageSection } from "@/sections/AIUsageSection";



export function HomePage() {

  return (
    <section className="relative">
      <title>신영재 | Frontend Developer</title>
      <meta name="author" content="신영재" />
      <meta
        name="keywords"
        content="프론트엔드 개발자, React, TypeScript, Next.js, 포트폴리오"
      />

      <aside
        className={cn(
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

        <AIUsageSection/>
        
        <ScrollReveal>
          <ContactSection
            email={userData.email}
            phone={userData.phone}
            blogUrl={userData.blogUrl}
          />
        </ScrollReveal>
        
      </main>
      <Footer name={userData.name} />
      <Outlet />
    </section>
  );
}
