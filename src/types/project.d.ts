// src/types/project.d.ts

export type Project = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  screenshots: string[];
  technologies: string[];
  roles: string[];
  startDate: string;
  endDate: string;
  githubUrl: string;
  demoUrl: string;
  details: string;
};
