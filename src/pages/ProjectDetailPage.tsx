import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Separator } from "@/components/atoms/separator";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { MediaCarousel } from "@/components/molecules/MediaCarousel";
import { imageBaseUrl } from "@/constants/path";
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

function ProjectDetailPage() {
  const project = useLoaderData() as IProject;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const thumbnails = createProjectThumbnailSrc(project.id);

  const projectSkills = project.skills
    .map((id) => skillsData.find((s) => s.id === id))
    .filter((s): s is ISkill => s !== undefined);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/55 backdrop-blur-md"
      onClick={() => navigate(-1)}
    >
      <div
        className="bg-card text-foreground relative flex h-[90vh] w-9/10 max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent gradient line */}
        <div className="via-chart-2 absolute top-0 right-0 left-0 z-10 h-0.5 bg-gradient-to-r from-transparent to-transparent" />

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
          {/* 썸네일 + title overlay */}
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
              className="h-48 w-full object-cover sm:h-60"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-6">
              <p className="mb-1 font-mono text-[10px] font-semibold tracking-[0.25em] text-white/55 uppercase">
                {project.name}
              </p>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            {/* Overview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="text-chart-2 h-3.5 w-3.5 shrink-0" />
                <span className="text-muted-foreground font-mono text-[10px] font-semibold tracking-[0.25em] uppercase">
                  Overview
                </span>
                <Badge variant="outline" className="ml-auto shrink-0">
                  {project.name}
                </Badge>
              </div>
              <div className="border-chart-2 border-l-2 pl-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Info Box */}
            <Card className="border-border overflow-hidden rounded-xl border">
              <CardContent className="p-0">
                {/* 기간 + 역할 */}
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-1.5 p-4">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      기간
                    </div>
                    <p className="text-sm font-medium">
                      {formatDate(project.startDate)} –{" "}
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                  <div className="border-border flex flex-col gap-1.5 border-l p-4">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                      <User className="h-3.5 w-3.5 shrink-0" />
                      역할
                    </div>
                    <p className="text-sm font-medium">{project.role}</p>
                  </div>
                </div>

                <Separator />

                {/* 기술 스택 */}
                {projectSkills.length > 0 && (
                  <div className="space-y-3 p-4">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                      <Layers className="h-3.5 w-3.5 shrink-0" />
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
                  <>
                    <Separator />
                    <div className="space-y-2 p-4">
                      <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                        <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                        개발 배경
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.details.background}
                      </p>
                    </div>
                  </>
                )}

                {/* 핵심 기능 */}
                {project.details?.keyFeatures &&
                  project.details.keyFeatures.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2 p-4">
                        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                          <ListChecks className="h-3.5 w-3.5 shrink-0" />
                          핵심 기능
                        </div>
                        <ul className="space-y-1.5">
                          {project.details.keyFeatures.map((feature, i) => (
                            <li
                              key={i}
                              className="text-muted-foreground flex items-start gap-2 text-sm"
                            >
                              <span className="text-chart-2 mt-0.5 shrink-0 select-none">
                                ▸
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
              </CardContent>
            </Card>

            {/* 도전 과제 */}
            {project.details && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="text-chart-2 h-3.5 w-3.5 shrink-0" />
                  <span className="text-muted-foreground font-mono text-[10px] font-semibold tracking-[0.25em] uppercase">
                    도전 과제
                  </span>
                </div>

                <div className="space-y-3">
                  {project.details.challenges.map((challenge, i) => (
                    <Card
                      key={i}
                      className="border-border overflow-hidden rounded-xl border p-0"
                    >
                      <CardContent className="p-0">
                        {/* 문제 */}
                        <div className="flex items-start gap-4 p-4">
                          <Badge
                            variant="destructive"
                            className="mt-0.5 shrink-0 text-[10px]"
                          >
                            문제
                          </Badge>
                          <p className="text-sm leading-relaxed">
                            {challenge.problem}
                          </p>
                        </div>

                        <Separator />

                        {/* 해결 */}
                        <div className="flex items-start gap-4 p-4">
                          <Badge
                            variant="default"
                            className="bg-chart-2 hover:bg-chart-2/90 mt-0.5 shrink-0 text-[10px]"
                          >
                            해결
                          </Badge>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {challenge.solution}
                          </p>
                        </div>

                        {/* 성과 */}
                        {challenge.impact && (
                          <>
                            <Separator />
                            <div className="bg-muted/40 flex items-start gap-4 p-4">
                              <Badge
                                variant="secondary"
                                className="mt-0.5 shrink-0 border-none bg-emerald-500/15 text-[10px] text-emerald-600 dark:text-emerald-400"
                              >
                                성과
                              </Badge>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {challenge.impact}
                              </p>
                            </div>
                          </>
                        )}

                        {/* 이미지 */}
                        {challenge.imgs && challenge.imgs.length > 0 && (
                          <>
                            <Separator />
                            <div className="m-auto aspect-video max-w-md p-4">
                              <MediaCarousel
                                imgs={challenge.imgs}
                                basePath={`${imageBaseUrl}/challenges/${project.id}`}
                                altPrefix={challenge.id}
                              />
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
