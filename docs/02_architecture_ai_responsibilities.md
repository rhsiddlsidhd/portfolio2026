### 2.1.1. AI 도구별 역할 분담 (AI Tool Responsibilities)

이 프로젝트는 두 가지 AI 도구를 사용하며, 각 도구의 작업 범위가 명확히 구분됩니다.

- **Claude Code**: UI 구조 설계 및 컴포넌트 구현을 전담합니다. `atoms/`부터 `organisms/`, `layout/`, `pages/`까지 전체 UI 계층의 설계·구현과 Storybook story 작성을 담당합니다.
- **Gemini CLI**: 디버깅 및 기능 구현 보완에 집중합니다. 커스텀 훅, API 연동, 유틸리티 함수, 상태 관리, 타입 정의 등 로직 영역과 Vitest 테스트 작성을 담당합니다.

---

#### Claude Code 담당 영역 (UI 구조 & 컴포넌트 설계)

| 폴더/파일 | 역할 |
|---|---|
| `src/components/atoms/` | shadcn/ui 컴포넌트 검색, 설치(`npx shadcn-ui@latest add`), 초기 구성 및 커스터마이징 |
| `src/components/molecules/` | atom 조합 컴포넌트 설계·구현 |
| `src/components/organisms/` | 복합 UI 영역 설계·구현 |
| `src/components/layout/` | Header, Footer 등 레이아웃 컴포넌트 |
| `src/pages/` | 페이지 컴포넌트 구조 설계·구현 |
| `src/styles/` | Tailwind 테마, 디자인 토큰, 전역 스타일 |
| `*.stories.tsx` | Storybook story 작성 (UI 시각 테스트) |

#### Gemini CLI 담당 영역 (디버깅 & 기능 구현 보완)

| 폴더/파일 | 역할 |
|---|---|
| `src/hooks/` | 커스텀 훅 구현 |
| `src/api/` | axios 인스턴스, API 호출 함수, 에러 핸들링 |
| `src/utils/` | 유틸리티 함수 구현 |
| `src/context/` | Context Provider 구현 |
| `src/types/` | TypeScript 타입/인터페이스 정의 |
| `src/constants/` | 상수 관리 (에러 메시지, 라우트 경로 등) |
| `*.test.ts` / `*.test.tsx` | Vitest 로직 단위/통합 테스트 작성 |
| 버그 수정·디버깅 | 기존 코드 디버깅, 성능 이슈 분석·해결 |

---

#### 협업 경계 규칙

| 상황 | Claude Code 행동 | Gemini CLI 행동 |
|---|---|---|
| 새 UI 컴포넌트 필요 | 직접 설계·구현 | 컴포넌트 파일을 직접 생성하지 않음 |
| 컴포넌트에 로직 훅 필요 | 훅 인터페이스를 정의하고 Gemini에 구현 요청 안내 | 커스텀 훅 작성 담당 |
| API 연동 필요 | UI에서 호출 구조만 설계 | API 함수·에러 핸들링 구현 |
| 스타일 이슈 | Tailwind/shadcn 스타일 직접 수정 | 관여하지 않음 |
| 버그 발견 (UI 렌더링) | 직접 수정 | 관여하지 않음 |
| 버그 발견 (로직/데이터) | 관여하지 않음 | 분석·수정 담당 |
| 타입 정의 필요 | 컴포넌트 Props 타입만 직접 정의 | 공유 타입/API 응답 타입 등 `src/types/` 관리 |

#### Claude Code 행동 규칙

| 상황 | Claude Code 행동 |
|---|---|
| `src/hooks/`, `src/api/`, `src/utils/`, `src/context/` 파일 추가/수정 | **금지** — 읽기 전용으로 취급하고 import만 사용 |
| 새로운 커스텀 훅이 필요한 경우 | 직접 생성하지 않고 **사용자에게 Gemini CLI로 추가를 요청하라고 안내** |
| API 함수가 필요한 경우 | 직접 생성하지 않고 **사용자에게 Gemini CLI로 추가를 요청하라고 안내** |

#### Gemini CLI 행동 규칙

| 상황 | Gemini CLI 행동 |
|---|---|
| `src/components/` 하위 파일 추가/수정 | **금지** — 읽기 전용으로 취급하고 import만 사용 |
| 새로운 UI 컴포넌트가 필요한 경우 | 직접 생성하지 않고 **사용자에게 Claude Code로 추가를 요청하라고 안내** |
| `npx shadcn-ui@latest add` 명령어 | **실행하지 않음** — Claude Code 영역 |
| `src/styles/` 파일 수정 | **금지** — Claude Code 영역 |
| `*.stories.tsx` 파일 작성 | **금지** — Claude Code 영역 |
