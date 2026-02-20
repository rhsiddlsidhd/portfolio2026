import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { SkillBadge } from "./SkillBadge";
import { ExternalLink, Github } from "lucide-react";
import { IProject } from "../../../shared/src/types/project"; // Import IProject
import { Badge } from "../atoms/badge";

interface Skill {
  id: string;
  name: string;
  category: string;
  thumbnailUrl?: string | null;
}

interface ProjectCardProps {
  project: IProject; // Use IProject
  allSkills: Skill[]; // 전체 skills 데이터 (매핑용)
  className?: string;
}

export function ProjectCard({
  project,
  allSkills,
  className,
}: ProjectCardProps) {
  // skill IDs를 실제 skill 객체로 매핑
  const projectSkills = project.skills
    .map((skillId) => allSkills.find((s) => s.id === skillId))
    .filter((s): s is Skill => s !== undefined);

  const hasLinks = project.deployUrl || project.githubUrl;
  console.log(project);
  return (
    <Card className={className}>
      {project.thumbnailUrls && ( // Conditionally render if thumbnailUrls exist
        <picture className="">
          <source
            srcSet={`${project.thumbnailUrls.webp.w320} 320w,
                     ${project.thumbnailUrls.webp.w640} 640w,
                     ${project.thumbnailUrls.webp.w960} 960w,
                     ${project.thumbnailUrls.webp.w1280} 1280w`}
            sizes="(min-width: 1536px) 485px,
                   (min-width: 1280px) 400px,
                   (min-width: 1024px) 314px,
                   (min-width: 768px) 356px,
                   (min-width: 640px) 292px,
                   calc(100vw - 32px)"
            type="image/webp"
          />
          <source
            srcSet={`${project.thumbnailUrls.jpeg.w320} 320w,
                     ${project.thumbnailUrls.jpeg.w640} 640w,
                     ${project.thumbnailUrls.jpeg.w960} 960w,
                     ${project.thumbnailUrls.jpeg.w1280} 1280w`}
            sizes="(min-width: 1536px) 485px,
                   (min-width: 1280px) 400px,
                   (min-width: 1024px) 314px,
                   (min-width: 768px) 356px,
                   (min-width: 640px) 292px,
                   calc(100vw - 32px)"
            type="image/jpeg"
          />
          <img
            src={project.thumbnailUrls.default}
            alt={`${project.title} thumbnail`}
            className="h-auto w-full rounded-t-lg object-cover" // Added some basic styling
            loading="lazy" // Add lazy loading by default
          />
        </picture>
      )}

      <CardHeader>
        <CardTitle className="text-xl">{project.title} </CardTitle>
        <Badge data-slot="badge" variant="secondary">
          {project.name}
        </Badge>
        {project.role && (
          <CardDescription className="text-xs">{project.role}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Skills */}
        {projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {projectSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </CardContent>

      {/* Links */}
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
