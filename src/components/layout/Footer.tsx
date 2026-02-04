// src/components/layout/Footer.tsx

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 mt-16 text-center text-muted-foreground border-t">
      <div className="flex justify-center gap-4 mb-2">
        {/* TODO: Fetch social links from profile.json and replace with Icon/Link components */}
        <a href="https://github.com/your_github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/your_linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <p>&copy; {currentYear} My Portfolio. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
