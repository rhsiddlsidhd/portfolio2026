// src/components/layout/Header.tsx
import { useTheme } from '@/hooks/use-theme';
import { SECTION_IDS } from '@/constants/routes';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm">
      <div className="text-lg font-bold">My Portfolio</div>
      <nav className="flex items-center gap-4">
        {/* TODO: Replace with navigation link components */}
        <a href={`#${SECTION_IDS.SKILLS}`} onClick={(e) => { e.preventDefault(); handleScrollTo(SECTION_IDS.SKILLS); }}>Skills</a>
        <a href={`#${SECTION_IDS.PROJECTS}`} onClick={(e) => { e.preventDefault(); handleScrollTo(SECTION_IDS.PROJECTS); }}>Projects</a>
        <a href={`#${SECTION_IDS.CONTACT}`} onClick={(e) => { e.preventDefault(); handleScrollTo(SECTION_IDS.CONTACT); }}>Contact</a>

        {/* TODO: Replace with a styled Button atom component */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md border" // Placeholder style
        >
          {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </nav>
    </header>
  );
};

export default Header;
