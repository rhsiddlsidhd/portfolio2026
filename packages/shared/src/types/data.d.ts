// packages/shared/src/types/data.d.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  tags: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface DbData {
  projects: Project[];
  skills: Skill[];
}
