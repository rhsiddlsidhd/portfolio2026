// src/types/profile.d.ts

export type Profile = {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    blog: string;
  };
};
