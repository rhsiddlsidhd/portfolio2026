import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { IProject } from "../../../shared/src/types/project";
import type { ISkill } from "../../../shared/src/types/skill";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { ExternalLink, Github, ArrowLeft, CalendarDays } from "lucide-react";
import skillsData from "../../../shared/data/skills.json";

const formatDate = (date?: string | null) =>
  date ? date.slice(0, 7).replace("-", ".") : "진행 중";

const Project = () => {
  const project = useLoaderData() as IProject;
  const navigate = useNavigate();

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
        className="bg-background text-foreground relative flex h-[85vh] w-9/10 max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
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
          {/* 썸네일 */}
          {project.thumbnailUrl && (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-48 w-full object-cover"
            />
          )}

          <div className="space-y-10 p-4 sm:p-6">
            {/* 기본 정보 */}
            <div className="space-y-2">
              <Badge variant="secondary">{project.name}</Badge>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <CalendarDays className="h-3 w-3 shrink-0" />
                <span>
                  {formatDate(project.startDate)} –{" "}
                  {formatDate(project.endDate)}
                </span>
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {project.title}
              </h1>
              <p className="text-muted-foreground text-sm">{project.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* 기술 스택 */}
            {projectSkills.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase">
                  기술 스택
                </h2>
                <div className="flex flex-wrap gap-2">
                  {projectSkills.map((skill) => (
                    <SkillBadge
                      key={skill.id}
                      skill={skill}
                      className="px-3 py-1"
                    />
                  ))}
                </div>
              </section>
            )}

            {project.details && (
              <>
                {/* 개발 배경 */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase">
                    개발 배경
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.details.background}
                  </p>
                </section>

                {/* 핵심 기능 */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase">
                    핵심 기능
                  </h2>
                  <ul className="space-y-2">
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
                </section>

                {/* 도전 과제 */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase">
                    도전 과제
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
                        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                          <img
                            src={`/images/challenges/${challenge.id}.webp`}
                            alt={`${challenge.id} evidence`}
                            className="w-full rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
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
