import { Header, Footer } from "@/components/layout";
import { ThemeToggle } from "@/components/molecules";
import { cn } from "@/lib/utils";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  AISection,
} from "@/components/templates";
import { Outlet } from "react-router";
import userData from "../data/user.json"
import skillData from "../data/skills.json"
import projectData from "../data/projects.json"


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
        
        <AboutSection description={userData.description} />
        
        <Header className="sticky top-2 py-2" />

        <SkillsSection skills={skillData} />

        <ProjectsSection projects={projectData} allSkills={skillData} />

        <AISection />
        
        
        <ContactSection
            email={userData.email}
            phone={userData.phone}
            blogUrl={userData.blogUrl}
        />
        
      </main>
      <Footer name={userData.name} />
      <Outlet />
    </section>
  );
}
