import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/organisms/HeroSection";
import "./App.css";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <HeroSection />
        {/* Other sections (SkillSection, ProjectSection, ContactSection) will be added here */}
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
