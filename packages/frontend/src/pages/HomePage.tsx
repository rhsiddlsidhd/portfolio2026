import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
} from '@/sections'

// Import data from shared package
import userData from '../../../shared/data/user.json'
import skillsData from '../../../shared/data/skills.json'
import projectsData from '../../../shared/data/projects.json'

export function HomePage() {
  return (
    <>
      <Header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />

      <main>
        <HeroSection user={userData} />
        <AboutSection description={userData.description} />
        <SkillsSection skills={skillsData} />
        <ProjectsSection projects={projectsData} allSkills={skillsData} />
        <ContactSection
          email={userData.email}
          phone={userData.phone}
          blogUrl={userData.blogUrl}
        />
      </main>

      <Footer name={userData.name} />
    </>
  )
}
