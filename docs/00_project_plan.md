# 00. 프로젝트 기획안 (Project Plan)

## 0.1. 목적 및 비전 (Purpose & Vision)
*   기술 중심의 전문적인 UI/UX와 성능 최적화를 강조하여 개인의 개발 역량과 철학을 효과적으로 시연하고 개인 브랜딩을 강화합니다.
*   채용 담당자 및 잠재적 협력자에게 깊은 인상을 남길 수 있는 시각적, 기능적 자료를 제공합니다.

## 0.2. 컨셉 및 디자인 방향 (Concept & Design Direction)
*   **전반적인 컨셉:** 기술 중심의 전문적인 UI/UX
*   **컬러 팔레트:** 다크 그레이(`base`)와 레드(`accent`) 조합을 메인으로 사용 (예: `dark-gray` 배경에 `red` 포인트).
*   **폰트 스타일:** 가독성이 높고 전문적인 느낌을 주는 폰트 (예: Noto Sans, Pretendard 등)
*   **테마:** 다크 모드와 라이트 모드를 모두 지원하며, 사용자 선택에 따라 전환 가능.

## 0.3. 주요 기능 (핵심 콘텐츠 - 단일 페이지 내 섹션 구현) (Key Features - Implemented as Sections within a Single Page)
*   **자기소개 섹션 (About Me Section):** 개발 경력, 교육 배경, 핵심 역량, 개발 철학 등을 요약하여 보여줍니다. (`public/data/profile.json` 활용)
*   **프로젝트 쇼케이스 섹션 (Projects Section):** 각 프로젝트에 대한 상세 설명 (UI/UX 및 성능 최적화 강조), 사용 기술 스택, 기여도, 라이브 데모 링크 및 GitHub 리포지토리 링크를 제공합니다. (`public/data/projects.json` 활용)
*   **기술 스택 섹션 (Skills Section):** 숙련된 기술들을 카테고리별로 분류하여 보여주고, 각 기술에 대한 경험과 이해도를 간략히 설명합니다. (`public/data/skills.json` 활용)
*   **연락처 섹션 (Contact Section):** 이메일, LinkedIn, GitHub 등 방문자가 연락할 수 있는 다양한 방법을 제공합니다.
*   **반응형 디자인:** 모든 디바이스(데스크톱, 태블릿, 모바일)에서 최적의 사용자 경험을 제공.

## 0.4. 특별한 기능 및 인터랙션 (Special Features & Interaction)
*   **테마 전환:** 다크 모드 <-> 라이트 모드 전환 기능 제공.
*   **스크롤 반응형 인터랙션:** 페이지 스크롤에 따라 요소들이 동적으로 나타나거나 움직이는 애니메이션 효과를 적용하여 사용자 경험을 향상 (애니메이션 초본 개발 후 사용자 업데이트).

## 0.5. 기술 스택 (Technology Stack)
*   **언어:** TypeScript
*   **프레임워크/라이브러리:** React
*   **스타일링:** Tailwind CSS
*   **상태 관리:** Context API
*   **데이터 페칭:** axios (인터셉터를 통한 에러 핸들링 포함)
*   **데이터 소스:** `public/data` 내의 JSON 파일을 GitHub Serverless Function(또는 유사한 서버리스 방식)으로 호출.
*   **로딩 처리:** 스켈레톤 UI
*   **번들러:** Vite
*   **배포:** Vercel 또는 Netlify (CI/CD: GitHub Actions 연동)

## 0.6. 개발 단계 (Development Roadmap)
1.  **기본 환경 설정:** 기존 프로젝트 환경 재정비, `src/pages/HomePage.tsx`를 메인 페이지로 사용 및 `src/components/sections` 디렉토리 생성.
2.  **테마 시스템 구현:** 다크/라이트 모드 전환 기능 및 Tailwind CSS를 이용한 컬러 팔레트 적용.
3.  **데이터 모듈 구현:** GitHub Serverless Function을 통해 `public/data/*.json` 파일을 호출하고, `axiosInstance`를 이용한 데이터 페칭 및 스켈레톤 UI 적용.
4.  **레이아웃 및 내비게이션:** `Header`, `Footer` 컴포넌트 재점검 및 페이지 내 섹션 이동을 위한 스크롤 기반 내비게이션 설정.
5.  **자기소개 섹션 컴포넌트 구현:** `profile.json` 데이터를 활용하여 자기소개 섹션 컴포넌트를 구현하고 `HomePage.tsx`에 통합.
6.  **기술 스택 섹션 컴포넌트 구현:** `skills.json` 데이터를 활용하여 기술 스택 섹션 컴포넌트를 구현하고 `HomePage.tsx`에 통합.
7.  **프로젝트 쇼케이스 섹션 컴포넌트 구현:** `projects.json` 데이터를 활용하여 프로젝트 쇼케이스 섹션 컴포넌트를 구현하고 `HomePage.tsx`에 통합 (UI/UX 및 성능 최적화 강조).
8.  **연락처 섹션 컴포넌트 구현:** 연락처 정보를 표시하는 섹션 컴포넌트를 구현하고 `HomePage.tsx`에 통합.
9.  **스크롤 반응형 인터랙션 구현:** 기본 스켈레톤 애니메이션 적용.
10. **최적화 및 배포 준비:** 성능 최적화(코드 스플리팅, 이미지 최적화 등) 및 배포 스크립트 설정.
