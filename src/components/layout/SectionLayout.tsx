import React from "react";
import { cn } from "@/lib/utils";
import { SectionSeparator } from "@/components/molecules";
import { Reveal } from "../organisms";

interface SectionLayoutProps {
  id: string;
  children: React.ReactNode;
  index?: string;
  className?: string;
  showSeparator?: boolean;
}

/**
 * 포트폴리오의 각 섹션에 공통적으로 적용되는 레이아웃 템플릿입니다.
 * 큰 장식 숫자(index), 고유 ID, 배경 처리, 하단 구분선을 포함합니다.
 */
export function SectionLayout({
  id,
  index,
  children,
  className,
  showSeparator = true,
}: SectionLayoutProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-24", className)}
    >
      {/* Large decorative index number */}
      <Reveal threshold={1} delay={300}>
        <div
          aria-hidden
          className="text-foreground/[0.07] pointer-events-none absolute top-6 right-6 font-mono text-[7rem] leading-none font-bold select-none md:text-[9rem]"
        >
          {index}
        </div>
      </Reveal>
      <Reveal>{children}</Reveal>
      {showSeparator && <SectionSeparator />}
    </section>
  );
}
