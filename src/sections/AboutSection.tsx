import { useNavigate } from "react-router";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Separator } from "@/components/atoms/separator";
import { HighlightedText, type IHighlightItem } from "@/components/molecules/HighlightedText";
import ScrollReveal from "@/components/organisms/ScrollReveal";

interface AboutSectionProps {
  description: string;
}

export function AboutSection({ description }: AboutSectionProps) {
  const navigate = useNavigate();

  const highlights: IHighlightItem[] = [
    {
      word: "풀스택 개발",
      onClick: () => navigate("/project/tieknot"),
    },
    {
      word: "AI",
      onClick: () => {
        const element = document.getElementById("ai-usage");
        element?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24">
      {/* Large decorative index number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 select-none font-mono text-[7rem] font-bold leading-none text-foreground/[0.07] md:text-[9rem]"
      >
        01
      </div>

      <div className="container relative mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeader title="About Me" align="left" className="mb-10" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="relative border-l-2 border-chart-2 pl-6">
              <HighlightedText
                text={description}
                highlights={highlights}
                className="text-foreground/80 text-lg leading-[1.9] break-keep"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom fade divider */}
      <Separator className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-muted-foreground/30 to-transparent border-none" />
    </section>
  );
}
