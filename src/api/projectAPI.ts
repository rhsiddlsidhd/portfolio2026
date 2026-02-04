// src/api/projectAPI.ts
import api from './index.ts';
import { API_ENDPOINTS } from '@/constants/apiEndpoints.ts';
import type { Profile } from '@/types/profile.d.ts';
import type { Skill } from '@/types/skill.d.ts';
import type { Project } from '@/types/project.d.ts';
import type { AxiosResponse } from 'axios'; // AxiosResponse import 추가

export const getProfile = async (): Promise<Profile> => {
  const response: AxiosResponse<Profile> = await api.get(API_ENDPOINTS.PROFILE);
  return response.data;
};

export const getSkills = async (): Promise<Skill[]> => {
  const response: AxiosResponse<Skill[]> = await api.get(API_ENDPOINTS.SKILLS);
  return response.data;
};

export const getProjects = async (): Promise<Project[]> => {
  const response: AxiosResponse<Project[]> = await api.get(API_ENDPOINTS.PROJECTS);
  return response.data;
};
