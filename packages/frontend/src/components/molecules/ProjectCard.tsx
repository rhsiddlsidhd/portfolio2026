import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { SkillBadge } from './SkillBadge'
import { ExternalLink, Github } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  thumbnailUrl?: string | null
}

interface ProjectCardProps {
  project: {
    id: string
    name: string
    title: string
    description: string
    skills: string[] // skill IDs
    thumbnailUrl?: string | null
    deployUrl?: string | null
    githubUrl?: string | null
    startDate?: string | null
    endDate?: string | null
    role?: string
  }
  allSkills: Skill[] // 전체 skills 데이터 (매핑용)
  className?: string
}

export function ProjectCard({
  project,
  allSkills,
  className,
}: ProjectCardProps) {
  // skill IDs를 실제 skill 객체로 매핑
  const projectSkills = project.skills
    .map((skillId) => allSkills.find((s) => s.id === skillId))
    .filter((s): s is Skill => s !== undefined)

  const hasLinks = project.deployUrl || project.githubUrl

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        {project.role && (
          <CardDescription className="text-xs">{project.role}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Skills */}
        {projectSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {projectSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} showTooltip={false} />
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
                <Github />
                GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
