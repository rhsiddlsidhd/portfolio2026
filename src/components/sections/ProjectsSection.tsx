// src/components/sections/ProjectsSection.tsx
import React, { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer'; // useInView 제거
import { getProjects } from '@/api/projectAPI'; // 프로젝트 데이터를 가져올 API 함수
import type { Project } from '@/types/project'; // 프로젝트 타입
import type { ApiError } from '@/types/api'; // ApiError import 추가
import Skeleton from '@/components/atoms/skeleton'; // 스켈레톤 컴포넌트
import { SECTION_IDS } from '@/constants/routes'; // 섹션 ID
import { Card } from '@/components/atoms/card'; // Card 컴포넌트 사용
import { Badge } from '@/components/atoms/badge'; // Badge 컴포넌트 사용
import AnimationSection from '@/components/molecules/AnimationSection'; // AnimationSection import

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError((err as ApiError).message || 'Failed to fetch projects data');
      } finally {
        setLoading(false);
      }
    };
    fetchProjectsData();
  }, []);

  if (loading) {
    return (
      <AnimationSection id={SECTION_IDS.PROJECTS} className="container mx-auto p-8"> {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">
          <Skeleton className="h-8 w-1/4" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-48 w-full mb-4" /> {/* 썸네일 스켈레톤 */}
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </AnimationSection>
    );
  }

  if (error) {
    return (
      <AnimationSection id={SECTION_IDS.PROJECTS} className="container mx-auto p-8"> {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">My Projects</h2>
        <p className="text-red-500">Error: {error}</p>
      </AnimationSection>
    );
  }

  return (
    <AnimationSection id={SECTION_IDS.PROJECTS} className="container mx-auto p-8"> {/* AnimationSection으로 감쌈 */}
      <h2 className="text-3xl font-bold mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 flex flex-col">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm flex-grow mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Demo
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </AnimationSection>
  );
};

export default ProjectsSection;
