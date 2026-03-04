import { useNavigate } from "react-router";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { HighlightedText, type IHighlightItem } from "@/components/molecules/HighlightedText";
import Reveal from "@/components/organisms/Reveal";
import { scrollToSection } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";

interface AboutSectionProps {
  description: string;
}

export function AboutSection({ description }: AboutSectionProps) {
  const navigate = useNavigate();

  const highlights: IHighlightItem[] = [
    { id:'tieknot',
      label: "풀스택 개발",
      onClick: (id:string) => navigate(`/project/${id}`),
    },
    { id:'ai',
      label: "AI",
      onClick: (id:string) => scrollToSection(`${id}-section`),
    },
  ];


  return (
  <SectionLayout id="about-section" index="01">
      <div className="container relative mx-auto px-4 md:px-8">
          <SectionHeader title="소개" align="left" className="mb-10" />
          <div className="mx-auto max-w-3xl">
            <div className="relative border-l-2 border-chart-2 pl-6">
              <HighlightedText
                text={description}
                highlights={highlights}
                className="text-foreground/80 text-lg leading-[1.9] break-keep"
              />
            </div>
          </div>
      </div>
    </SectionLayout>
  );
}
