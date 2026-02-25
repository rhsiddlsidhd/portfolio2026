### 2.1.1. AI 도구별 역할 분담 (AI Tool Responsibilities)

이 프로젝트는 두 가지 AI 도구를 사용하며, 각 도구의 작업 범위가 명확히 구분됩니다.

- **Claude Code**: 테스트 코드 작성 및 코드 리뷰를 전담합니다. Gemini CLI가 구현한 컴포넌트와 로직에 대해 단위·통합·UI 테스트를 작성하고, 코드 품질을 리뷰합니다.
- **Gemini CLI**: UI 컴포넌트 구현 및 로직 영역을 담당합니다. atoms부터 organisms, layout, pages까지 전체 UI 계층의 구현과 커스텀 훅, API 연동, 유틸리티 함수, 상태 관리, 타입 정의 등을 담당합니다.

---

#### Claude Code 담당 영역 (테스트 & 코드 리뷰)

| 파일 | 역할 |
|---|---|
| `*.test.ts` | Vitest 단위 테스트 작성 (유틸리티 함수, 커스텀 훅, API 함수) |
| `*.test.tsx` | Vitest + React Testing Library 통합 테스트 작성 (컴포넌트, 라우터, 훅+컴포넌트 조합) |
| `*.stories.tsx` | Storybook story 작성 (UI 시각 테스트) |
| **코드 리뷰** | Gemini CLI가 구현한 코드 전반에 대한 리뷰 |

#### Gemini CLI 담당 영역 (UI 구현 & 로직)

| 폴더/파일 | 역할 |
|---|---|
| `src/components/atoms/` | shadcn/ui 컴포넌트 검색, 설치, 초기 구성 및 커스터마이징 |
| `src/components/molecules/` | atom 조합 컴포넌트 설계·구현 |
| `src/components/organisms/` | 복합 UI 영역 설계·구현 |
| `src/components/layout/` | Header, Footer 등 레이아웃 컴포넌트 |
| `src/pages/` | 페이지 컴포넌트 구조 설계·구현 |
| `src/styles/` | Tailwind 테마, 디자인 토큰, 전역 스타일 |
| `src/hooks/` | 커스텀 훅 구현 |
| `src/api/` | axios 인스턴스, API 호출 함수, 에러 핸들링 |
| `src/utils/` | 유틸리티 함수 구현 |
| `src/context/` | Context Provider 구현 |
| `src/types/` | TypeScript 타입/인터페이스 정의 |
| `src/constants/` | 상수 관리 (에러 메시지, 라우트 경로 등) |
| 버그 수정·디버깅 | 기존 코드 디버깅, 성능 이슈 분석·해결 |

---

#### 협업 경계 규칙

| 상황 | Claude Code 행동 | Gemini CLI 행동 |
|---|---|---|
| 새 UI 컴포넌트 필요 | 사용자에게 Gemini CLI 요청 안내 | 직접 설계·구현 |
| 컴포넌트 구현 완료 후 | 테스트 작성 + 코드 리뷰 | — |
| 로직 훅/API 필요 | 사용자에게 Gemini CLI 요청 안내 | 직접 구현 |
| 버그 발견 (UI/로직 무관) | 리뷰 형태로 문제 명시, Gemini에 수정 요청 안내 | 분석·수정 담당 |
| 스타일 이슈 | 리뷰로 피드백 | 직접 수정 |
| 타입 정의 필요 | 테스트 파일 내 타입만 직접 정의 | 공유 타입/API 응답 타입 등 `src/types/` 관리 |

#### Claude Code 행동 규칙

| 상황 | Claude Code 행동 |
|---|---|
| `src/components/`, `src/pages/`, `src/hooks/`, `src/api/`, `src/utils/`, `src/context/`, `src/styles/` 파일 추가/수정 | **금지** — 테스트·리뷰 목적의 읽기만 허용 |
| 새로운 UI 컴포넌트가 필요한 경우 | 직접 생성하지 않고 **사용자에게 Gemini CLI로 구현을 요청하라고 안내** |
| 버그를 발견한 경우 | 직접 수정하지 않고 **코드 리뷰 형태로 문제를 명시하고 Gemini CLI에 수정 요청 안내** |

#### Gemini CLI 행동 규칙

| 상황 | Gemini CLI 행동 |
|---|---|
| `*.test.ts` / `*.test.tsx` 파일 추가/수정 | **금지** — Claude Code 영역 |
| `*.stories.tsx` 파일 작성 | **금지** — Claude Code 영역 |
| `npx shadcn-ui@latest add` 명령어 | Gemini CLI가 직접 실행 |
