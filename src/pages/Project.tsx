import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { ChallengeImageCarousel } from "@/components/molecules/ChallengeImageCarousel";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  CalendarDays,
  Zap,
  Layers,
  Lightbulb,
  ListChecks,
  User,
  Target,
} from "lucide-react";
import skillsData from "@/data/skills.json";
import { createProjectThumbnailSrc } from "@/lib/utils";

const formatDate = (date?: string | null) =>
  date ? date.slice(0, 7).replace("-", ".") : "진행 중";

const Project = () => {
  const project = useLoaderData() as IProject;
  const navigate = useNavigate();
  const thumbnails = createProjectThumbnailSrc(project.id);

  const projectSkills = project.skills
    .map((id) => skillsData.find((s) => s.id === id))
    .filter((s): s is ISkill => s !== undefined);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => navigate(-1)}
    >
      <div
        className="bg-accent text-foreground relative flex h-[85vh] w-9/10 max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 고정 헤더 */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">뒤로</span>
          </Button>
          <div className="flex gap-2">
            {project.deployUrl && (
              <Button variant="default" size="sm" asChild>
                <a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Live Demo</span>
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 썸네일 + name overlay */}
          
            <div className="relative">
              <img
                srcSet={thumbnails.webp}
                sizes="(min-width: 1536px) 485px,
                 (min-width: 1280px) 400px,
                 (min-width: 1024px) 314px,
                 (min-width: 768px) 356px,
                 (min-width: 640px) 292px,
                 70vw"
                src={thumbnails.default}
                alt={`${project.title} thumbnail`}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <span className="absolute right-4 bottom-6 text-xs font-bold tracking-wide text-white/90">
                {project.title}
              </span>
            </div>
          

          <div className="space-y-6 p-4 sm:p-6">
            {/* 제목 + 설명 */}
            <div className="space-y-2">
              <div className="text-primary flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                <Target className="h-4 w-4" />
                <span>Overview</span>
                <Badge variant="outline">{project.name}</Badge>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Info Box */}
            <div className="border-border divide-border divide-y overflow-hidden rounded-2xl border">
              {/* 기간 + 역할 */}
              <div className="divide-border grid grid-cols-2 divide-x">
                <div className="flex flex-col gap-1.5 p-4">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <CalendarDays className="h-3.5 w-3.5" />
                    기간
                  </div>
                  <p className="text-sm">
                    {formatDate(project.startDate)} –{" "}
                    {formatDate(project.endDate)}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 p-4">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <User className="h-3.5 w-3.5" />
                    역할
                  </div>
                  <p className="text-sm">{project.role}</p>
                </div>
              </div>

              {/* 기술 스택 */}
              {projectSkills.length > 0 && (
                <div className="space-y-3 p-4">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <Layers className="h-3.5 w-3.5" />
                    기술 스택
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectSkills.map((skill) => (
                      <SkillBadge key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              )}

              {/* 개발 배경 */}
              {project.details?.background && (
                <div className="space-y-2 p-4">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <Lightbulb className="h-3.5 w-3.5" />
                    개발 배경
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.details.background}
                  </p>
                </div>
              )}

              {/* 핵심 기능 */}
              {project.details?.keyFeatures &&
                project.details.keyFeatures.length > 0 && (
                  <div className="space-y-2 p-4">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                      <ListChecks className="h-3.5 w-3.5" />
                      핵심 기능
                    </div>
                    <ul className="space-y-1.5">
                      {project.details.keyFeatures.map((feature, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-start gap-2 text-sm"
                        >
                          <span className="text-primary mt-0.5 select-none">
                            ·
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* 도전 과제 + 회고 */}
            {project.details && (
              <>
                {/* 도전 과제 */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase">
                    <Zap className="inline-block h-4 w-4" /> 도전 과제
                  </h2>
                  <div className="space-y-4">
                    {project.details.challenges.map((challenge, i) => (
                      <div
                        key={i}
                        className="border-border space-y-3 rounded-xl border p-4"
                      >
                        <div>
                          <span className="text-destructive text-xs font-semibold">
                            문제
                          </span>
                          <p className="mt-0.5 text-sm">{challenge.problem}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-blue-500">
                            해결
                          </span>
                          <p className="text-muted-foreground mt-0.5 text-sm">
                            {challenge.solution}
                          </p>
                        </div>
                        {challenge.impact && (
                          <div>
                            <span className="text-xs font-semibold text-green-500">
                              성과
                            </span>
                            <p className="text-muted-foreground mt-0.5 text-sm">
                              {challenge.impact}
                            </p>
                          </div>
                        )}
                        {challenge.imgs && challenge.imgs.length > 0 && (
                          <ChallengeImageCarousel
                            imgs={challenge.imgs}
                            challengeId={challenge.id}
                            projectId={project.id}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 회고 */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase">
                    회고
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.details.retrospect}
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
