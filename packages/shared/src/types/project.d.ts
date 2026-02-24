export interface IChallenge {
  id: string; // 마주한 문제점의 고유 ID
  problem: string; // 마주한 문제점
  solution: string; // 해결 방법
  impact?: string | null; // 해결 후의 성과 (수치적 데이터 등)
}

export interface IProject {
  id: string;
  name: string;
  title: string;
  description: string; // 리스트용 간단한 설명
  skills: string[]; // 사용된 기술 ID 목록
  thumbnailUrl?: string | null; // 프로젝트 썸네일 이미지 경로
  deployUrl?: string | null; // 배포된 서비스 URL
  githubUrl?: string | null; // GitHub 저장소 URL
  startDate?: string | null; // 프로젝트 시작일 (YYYY-MM-DD)
  endDate?: string | null; // 프로젝트 종료일 (YYYY-MM-DD, 선택 사항)
  role: string; // 담당 역할

  // 상세 페이지를 위한 세부 데이터
  details?: {
    background: string; // 프로젝트 개발 배경
    keyFeatures: string[]; // 핵심 기능 목록
    challenges: IChallenge[]; // 도전 과제 및 문제 해결 경험
    retrospect: string; // 프로젝트 회고 및 배운 점
  };
}
