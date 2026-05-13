import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { ProjectLinkButton } from "@/components/molecules/ProjectLinkButton";
import { Badge } from "@/components/atoms/badge";
import { SkillBadge } from "./SkillBadge";
import type { IProject } from "@/types/project";
import type { ISkill } from "@/types/skill";
import { useNavigate } from "react-router";
import { createProjectThumbnailSrc, cn } from "@/lib/utils";

type ProjectCardProps = {
  project: IProject;
  allSkills: ISkill[];
  className?: string;
  inView?: boolean;
  onLoad?: () => void;
};

/** 프로젝트 정보와 사용 기술을 카드 형태로 표시하는 컴포넌트 */
export function ProjectCard({
  project,
  allSkills,
  className,
}: ProjectCardProps) {
  const router = useNavigate();
  const projectSkills = project.skills
    .map((skillId) => allSkills.find((s) => s.id === skillId))
    .filter((s): s is ISkill => s !== undefined);

  const hasLinks = project.deployUrl || project.githubUrl || project.notionUrl;
  const thumbnails = createProjectThumbnailSrc(project.id);

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 ease-out",
        "md:hover:border-primary/20 md:hover:scale-[1.02] md:hover:shadow-xl",
        "active:scale-[0.97] active:brightness-95",
        "focus-within:ring-ring focus-within:ring-2 focus-within:outline-none",
        className,
      )}
      onClick={() => router(`/project/${project.id}`)}
    >
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
        className="aspect-square w-full rounded-t-lg object-cover"
        loading="lazy"
      />

      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">{project.title}</CardTitle>
        <Badge data-slot="badge" variant="secondary">
          {project.name}
        </Badge>
        {project.role && (
          <CardDescription className="text-xs">{project.role}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {project.description}
        </p>
        {projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {/*  */}
            {projectSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </CardContent>

      {hasLinks && (
        <CardFooter className="gap-2">
          {project.deployUrl && (
            <ProjectLinkButton url={project.deployUrl} type="deploy" stopPropagation />
          )}
          {project.githubUrl && (
            <ProjectLinkButton url={project.githubUrl} type="github" stopPropagation />
          )}
          {project.notionUrl && (
            <ProjectLinkButton url={project.notionUrl} type="notion" stopPropagation />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
