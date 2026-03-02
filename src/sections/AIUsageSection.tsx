import { SectionHeader } from "@/components/molecules/SectionHeader";
import ScrollReveal from "@/components/organisms/ScrollReveal";
import aiUsageData from "@/data/ai-usage.json";
import { Link } from "react-router";

export function AIUsageSection() {
  return (
    <section id="ai-usage" className="relative py-20">
      {/* Large decorative index number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 select-none font-mono text-[7rem] font-bold leading-none text-foreground/[0.07] md:text-[9rem]"
      >
        04
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionHeader
            title="AI 이렇게 사용하고 있어요"
            subtitle="개발 워크플로우에 AI를 통합한 방식"
            align="left"
            className="mb-14"
          />
        </ScrollReveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiUsageData.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 80}>
              <Link to={`/ai/${item.id}`} className="block h-full">
                <li
                  className={[
                    "group relative h-full rounded-lg border border-border bg-card p-6",
                    "transition-all duration-300 hover:shadow-md hover:border-chart-2/50",
                    "before:absolute before:left-0 before:top-4 before:h-8 before:w-[3px] before:rounded-r-full",
                    item.accent,
                  ].join(" ")}
                >
                  <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-chart-2 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
