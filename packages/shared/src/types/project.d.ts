export interface IProject {
  id: string;
  name: string;
  title: string;
  description: string;
  skills: string[]; // 사용된 기술 이름 또는 ID 목록
  thumbnailUrls?: {
    webp: {
      w320: string;
      w640: string;
      w960: string;
      w1280: string;
    };
    jpeg: { // Assuming JPEG as fallback, could be png
      w320: string;
      w640: string;
      w960: string;
      w1280: string;
    };
    default: string; // fallback for <img src> for older browsers (e.g., largest jpeg)
  };
  deployUrl?: string; // 배포된 서비스 URL (선택 사항)
  githubUrl?: string; // GitHub 저장소 URL (선택 사항)
  startDate?: string; // 프로젝트 시작일 (YYYY-MM-DD)
  endDate?: string; // 프로젝트 종료일 (YYYY-MM-DD, 선택 사항)
  role: string; // 프로젝트에서 담당한 역할
}
