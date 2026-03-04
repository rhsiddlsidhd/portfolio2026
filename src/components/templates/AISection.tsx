import { Badge } from "@/components/atoms/badge";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import Reveal from "@/components/organisms/Reveal";
import aiUsageData from "@/data/ai-usage.json";
import { Link } from "react-router";
import { SectionLayout } from "../layout/SectionLayout";

const ACCENT_MAP: Record<string, string> = {
  blue: "before:bg-blue-500",
  emerald: "before:bg-emerald-500",
  green: "before:bg-green-500",
  amber: "before:bg-amber-500",
  orange: "before:bg-orange-500",
  rose: "before:bg-rose-500",
  red: "before:bg-red-500",
  violet: "before:bg-violet-500",
  purple: "before:bg-purple-500",
  cyan: "before:bg-cyan-500",
  sky: "before:bg-sky-500",
  pink: "before:bg-pink-500",
  indigo: "before:bg-indigo-500",
  teal: "before:bg-teal-500",
  yellow: "before:bg-yellow-500",
  lime: "before:bg-lime-500",
  fuchsia: "before:bg-fuchsia-500",
};

export function AISection() {
  return (
    <SectionLayout id="ai-section" index="04">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <SectionHeader
            title="AI 인프라 활용"
            subtitle="프롬프트 엔지니어링과 AI 에이전트를 통한 개발 생산성 극대화"
            align="left"
            className="mb-14"
          />
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiUsageData.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <li
                className={[
                  "group relative h-full rounded-lg border border-border bg-card p-6",
                  "transition-all duration-300 hover:border-chart-2/50 hover:shadow-md",
                  "before:absolute before:top-4 before:left-0 before:h-8 before:w-0.75 before:rounded-r-full",
                  ACCENT_MAP[item.accent] || "before:bg-muted",
                ].join(" ")}
              >
                <Link to={`/ai/${item.id}`} className="block h-full space-y-2">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-muted-foreground font-mono text-xs font-semibold tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-chart-2/50 text-chart-2 font-mono text-[10px] tracking-widest uppercase"
                    >
                      {item.model}
                    </Badge>
                  </div>
                  <h3 className="text-foreground group-hover:text-chart-2 text-base font-semibold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </SectionLayout>
  );
}
