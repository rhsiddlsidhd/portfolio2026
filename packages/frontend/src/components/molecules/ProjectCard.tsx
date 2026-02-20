import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { SkillBadge } from "./SkillBadge";
import { ExternalLink } from "lucide-react";
import type { IProject } from "../../../../shared/src/types/project";
import type { ISkill } from "../../../../shared/src/types/skill";
import { imageBaseUrl } from "@/constants/path";

type ThumbnailSrc = {
  webp: string;
  jpg: string;
  default: string;
};

const THUMBNAIL_WIDTHS = [1280, 960, 640, 320] as const;

const createProjectThumbnailSrc = (title: string): ThumbnailSrc => {
  const generateSrcSet = (ext: string): string =>
    THUMBNAIL_WIDTHS.map(
      (w) =>
        `${imageBaseUrl}/projects/${title}/${ext}/${title}_${w}w.${ext} ${w}w`,
    ).join(", ");

  return {
    webp: generateSrcSet("webp"),
    jpg: generateSrcSet("jpg"),
    default: `${imageBaseUrl}/projects/${title}/jpg/${title}_1280w.jpg`,
  };
};

type ProjectCardProps = {
  project: IProject;
  allSkills: ISkill[];
  className?: string;
};

/** 프로젝트 정보와 사용 기술을 카드 형태로 표시하는 컴포넌트 */
export function ProjectCard({
  project,
  allSkills,
  className,
}: ProjectCardProps) {
  const projectSkills = project.skills
    .map((skillId) => allSkills.find((s) => s.id === skillId))
    .filter((s): s is ISkill => s !== undefined);

  const hasLinks = project.deployUrl || project.githubUrl;
  const thumbnails = createProjectThumbnailSrc(project.title);

  return (
    <Card className={className}>
      <picture>
        <source
          srcSet={thumbnails.webp}
          sizes="(min-width: 1536px) 485px,
                 (min-width: 1280px) 400px,
                 (min-width: 1024px) 314px,
                 (min-width: 768px) 356px,
                 (min-width: 640px) 292px,
                 70vw"
          type="image/webp"
        />
        <source
          srcSet={thumbnails.jpg}
          sizes="(min-width: 1536px) 485px,
                 (min-width: 1280px) 400px,
                 (min-width: 1024px) 314px,
                 (min-width: 768px) 356px,
                 (min-width: 640px) 292px,
                 70vw"
          type="image/jpeg"
        />
        <img
          src={thumbnails.default}
          alt={`${project.title} thumbnail`}
          className="h-auto w-full rounded-t-lg object-cover"
          loading="lazy"
        />
      </picture>

      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <Badge data-slot="badge" variant="secondary">
          {project.name}
        </Badge>
        {project.role && (
          <CardDescription className="text-xs">{project.role}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
        {projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {projectSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} className="px-4 py-2" />
            ))}
          </div>
        )}
      </CardContent>

      {hasLinks && (
        <CardFooter className="gap-2">
          {project.deployUrl && (
            <Button variant="default" size="sm" asChild>
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
                Live Demo
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
                GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
