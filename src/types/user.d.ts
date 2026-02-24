export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  blogUrl: string;
  headline: string;
  description: string; // 새로운 상세 설명 필드
  resumeUrl?: string | null;
}
