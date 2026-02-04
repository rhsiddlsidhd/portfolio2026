// src/pages/HomePage.tsx
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection"; // ContactSection import 추가
import { SECTION_IDS } from "@/constants/routes"; // SECTION_IDS도 HomePage에서 사용될 수 있도록 임포트

const HomePage: React.FC = () => {
  return (
    <div id={SECTION_IDS.HOME} className="HomePage min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        {/* 각 섹션 컴포넌트들이 여기에 배치됩니다 */}
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection /> {/* ContactSection 추가 */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
