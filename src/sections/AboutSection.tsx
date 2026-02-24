import { SectionHeader } from "@/components/molecules/SectionHeader";

interface AboutSectionProps {
  description: string;
}

export function AboutSection({ description }: AboutSectionProps) {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeader title="About Me" className="mb-12" />

        <div className="mx-auto max-w-3xl">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
