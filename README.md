# 프론트엔드 포트폴리오

**Atomic Design 기반의 체계적인 컴포넌트 설계로 구축한 개인 포트폴리오 웹사이트**

TypeScript + React 19 + Tailwind CSS 4를 활용한 모던 프론트엔드 프로젝트입니다.

---

## 🚀 빠른 시작

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# Frontend 개발 서버 (Vite)
npm run dev:frontend

# Backend API 서버
npm run start:backend
```

### 빌드 및 테스트
```bash
# 프로덕션 빌드
npm run build:frontend

# 린트 검사
npm run lint:frontend

# 테스트 실행
npm run test:frontend
```

---

## 📦 프로젝트 구조 (Monorepo)

```
portfolio/
├── packages/
│   ├── frontend/          # React UI 애플리케이션
│   ├── backend/           # Express API 서버
│   └── shared/            # 공유 데이터
│       └── data/
│           ├── user.json       # 개인 정보
│           ├── skills.json     # 기술 스택 (25개)
│           └── projects.json   # 프로젝트 포트폴리오
├── docs/                  # 아키텍처 및 컨벤션 문서
├── CLAUDE.md             # Claude Code 역할 정의
└── GEMINI.md             # Gemini CLI 역할 정의
```

---

## 🛠️ 기술 스택

### Frontend
- **Core**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS 4, shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Utils**: clsx, tailwind-merge, class-variance-authority

### Backend
- **Framework**: Express.js
- **Data**: JSON 기반 정적 데이터

### Dev Tools
- **Linting**: ESLint + TypeScript ESLint
- **Testing**: Vitest + Playwright (브라우저 테스트)
- **Compiler**: React Compiler, SWC

---

## 🤖 AI 협업 개발 구조

이 프로젝트는 **Claude Code**와 **Gemini CLI** 두 AI 에이전트가 역할을 분담하여 개발합니다.

### Claude Code (UI/컴포넌트 설계)
**담당 영역:**
- `src/components/atoms/` - shadcn/ui 컴포넌트 구성
- `src/components/molecules/` - Atom 조합 컴포넌트
- `src/components/organisms/` - 복합 UI 영역
- `src/components/layout/` - Header, Footer 등
- `src/pages/` - 페이지 구조
- `src/styles/` - Tailwind 테마, 디자인 토큰
- `*.stories.tsx` - Storybook 스토리

### Gemini CLI (로직/유틸리티)
**담당 영역:**
- `src/hooks/` - 커스텀 훅
- `src/api/` - API 함수
- `src/utils/` - 유틸리티 함수
- `src/context/` - Context API
- `src/types/` - 타입 정의
- `src/constants/` - 상수
- `*.test.ts(x)` - Vitest 테스트

자세한 역할 분담은 `CLAUDE.md`, `GEMINI.md` 참조

---

## 📊 데이터 구조

### `packages/shared/data/user.json`
```typescript
{
  name: string          // 이름
  email: string         // 이메일
  phone: string         // 연락처
  blogUrl: string       // 블로그 URL
  headline: string      // 한 줄 소개
  description: string   // 상세 소개
  thumbnailUrl: string  // 프로필 이미지
  resumeUrl: string     // 이력서 링크
}
```

### `packages/shared/data/skills.json`
```typescript
[{
  id: string            // 고유 ID
  name: string          // 기술명
  category: string      // 카테고리 (Frontend, Language, Framework 등)
  thumbnailUrl: string  // 아이콘 URL
}]
```

### `packages/shared/data/projects.json`
```typescript
[{
  id: string            // 프로젝트 ID
  name: string          // 프로젝트 이름
  title: string         // 표시 제목
  description: string   // 상세 설명
  skills: string[]      // 사용 기술 (skills.json의 id 참조)
  thumbnailUrl: string  // 썸네일 이미지
  deployUrl: string     // 배포 URL
  githubUrl: string     // GitHub 리포지토리
  startDate: string     // 시작일
  endDate: string       // 종료일
  role: string          // 역할
}]
```

---

## 🏗️ 컴포넌트 아키텍처

**Atomic Design 패턴** 적용 (Bottom-up 방식)

```
Atoms (기본 UI 요소)
  ↓ 조합
Molecules (작은 기능 단위)
  ↓ 조합
Organisms (복잡한 UI 블록)
  ↓ 조합
Pages (전체 페이지)
```

- shadcn/ui를 Atoms의 기반으로 사용
- 재사용성과 유지보수성을 극대화하는 컴포넌트 설계
- Storybook으로 각 단계별 컴포넌트 시각화 및 테스트

---

## 📚 문서

### 프로젝트 개요
- [프로젝트 개요](./docs/01_project_overview.md)

### 아키텍처
- [AI 역할 분담](./docs/02_architecture_ai_responsibilities.md)
- [폴더 구조](./docs/02_architecture_folder_structure.md)
- [상태 관리](./docs/02_architecture_state_management.md)
- [데이터 페칭](./docs/02_architecture_data_fetching.md)

### 코딩 컨벤션
- [컴포넌트 작성 스타일](./docs/03_coding_conventions_component_style.md)
- [네이밍 규칙](./docs/03_coding_conventions_naming_rules.md)
- [TypeScript 규칙](./docs/03_coding_conventions_typescript.md)

### 스타일링
- [스타일링 방식](./docs/04_styling_guide_method.md)
- [디자인 시스템](./docs/04_styling_guide_design_system.md)

### 테스트
- [테스트 전략 개요](./docs/05_testing_strategy_overview.md)
- [Storybook 전략](./docs/05_testing_strategy_storybook.md)
- [Vitest 전략](./docs/05_testing_strategy_vitest.md)
- [테스트 제외 규칙](./docs/05_testing_strategy_exclusion.md)

---

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.
