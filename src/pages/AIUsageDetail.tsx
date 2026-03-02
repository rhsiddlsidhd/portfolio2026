import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { ArrowLeft, Cpu, Terminal, Workflow } from "lucide-react";
import type { IAIUsage } from "@/types/ai-usage";

const TypingText = ({ text }: { text: string }) => {
  const cleanText = text.replace(/"/g, "").trim();
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < cleanText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + cleanText[index]);
        setIndex((prev) => prev + 1);
      }, 75);
      return () => clearTimeout(timer);
    }
  }, [index, cleanText]);

  return (
    <div className="flex items-start gap-2 font-mono text-sm">
      <span className="mt-px shrink-0 select-none text-chart-2">›</span>
      <span className="min-w-0 flex-1 wrap-break-words text-foreground">
        {displayedText}
        {index < cleanText.length && (
          <span className="ml-0.5 inline-block h-3.25 w-1.5 translate-y-0.5 animate-pulse bg-chart-2 align-text-bottom" />
        )}
      </span>
    </div>
  );
};

const AIUsageDetail = () => {
  const data = useLoaderData() as IAIUsage;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/55 backdrop-blur-md"
      onClick={() => navigate(-1)}
    >
      <div
        className="bg-card text-foreground relative flex h-[90vh] w-9/10 max-w-4xl flex-col overflow-hidden rounded-2xl border border-border shadow-2xl animate-[heroEnter_0.4s_ease-out_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line — chart-2 cohesion */}
        <div className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-linear-to-r from-transparent via-chart-2 to-transparent" />

        {/* Fixed header */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">뒤로</span>
          </Button>
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-chart-2" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              AI Powered Workflow
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 p-6 sm:p-10">

            {/* ── Header ── */}
            <div className="space-y-4 animate-[heroEnter_0.6s_ease-out_both] [animation-delay:80ms]">
              <Badge
                variant="outline"
                className="font-mono text-[10px] uppercase tracking-widest border-chart-2/50 text-chart-2"
              >
                {data.model}
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {data.title}
              </h1>
              <div className="border-l-2 border-chart-2 pl-4">
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {data.description}
                </p>
              </div>
            </div>

            {/* ── Workflow ── */}
            <div className="space-y-5 animate-[heroEnter_0.6s_ease-out_both] [animation-delay:200ms]">
              <div className="flex items-center gap-2">
                <Workflow className="h-3.5 w-3.5 shrink-0 text-chart-2" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Workflow
                </span>
              </div>

              <div className="relative pl-8">
                {/* Connector line */}
                <div className="absolute left-2.75 top-3 bottom-3 w-px bg-linear-to-b from-chart-2/50 via-chart-2/20 to-transparent" />

                <div className="space-y-3">
                  {data.workflow.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      {/* Step node */}
                      <div className="absolute -left-8 z-10 mt-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-chart-2/50 bg-card">
                        <span className="font-mono text-[9px] font-bold leading-none text-chart-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Step content */}
                      <div className="flex-1 rounded-lg border border-border bg-muted/40 p-3 transition-colors hover:bg-muted/70">
                        <TypingText text={step}   />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Execution Output ── */}
            <div className="space-y-4 animate-[heroEnter_0.6s_ease-out_both] [animation-delay:360ms]">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 shrink-0 text-chart-2" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Execution Output
                </span>
              </div>

              {/* Terminal window — always dark */}
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
                {/* macOS chrome */}
                <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {data.id}.log
                  </span>
                </div>

                {/* Terminal body */}
                <div className="min-h-45 p-5 font-mono text-sm">
                  {data.imgs && data.imgs.length > 0 ? (
                    <div className="grid gap-4 justify-center">
                      {data.imgs.map((img, i) => (
                        <img
                          key={i}
                          src={`/images/ai/${img}`}
                          alt="Execution result"
                          className="rounded-lg opacity-85 transition-opacity hover:opacity-100"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 text-zinc-400">
                      <p>
                        <span className="mr-4 select-none text-zinc-700">1</span>
                        <span className="text-emerald-400">$</span>{" "}
                        <span className="text-zinc-200">run</span>{" "}
                        <span className="text-amber-300">{data.id}</span>
                      </p>
                      <p>
                        <span className="mr-4 select-none text-zinc-700">2</span>
                        <span className="animate-pulse">Analyzing workflow...</span>
                      </p>
                      <p>
                        <span className="mr-4 select-none text-zinc-700">3</span>
                        <span className="text-zinc-600">
                          # No visual output for this workflow
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AIUsageDetail;
