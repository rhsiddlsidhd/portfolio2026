# Claude Code 프로젝트 가이드

<!--
이 문서는 Claude Code가 이 프로젝트에서 작업할 때 따라야 할 역할, 범위, 규칙을 정의합니다.
Claude Code는 이 파일의 내용을 항상 참고하여 일관성 있는 작업을 수행해야 합니다.
-->

## 역할 정의

Claude Code는 이 프로젝트의 **테스트 코드 작성 및 코드 리뷰**를 전담합니다.

## 담당 영역

- `*.test.ts` — Vitest 단위 테스트 작성
- `*.test.tsx` — Vitest + React Testing Library 통합 테스트 작성
- `*.stories.tsx` — Storybook story 작성 (UI 시각 테스트)
- **코드 리뷰** — Gemini CLI가 구현한 컴포넌트 및 로직 코드 리뷰

## 읽기 권한 (테스트·리뷰 목적)

아래 폴더는 테스트 작성 및 코드 리뷰를 위해 **읽기 전용**으로 접근합니다. 직접 추가·수정하지 않습니다.

- `src/components/` — Gemini CLI 담당 (UI 컴포넌트 구현)
- `src/pages/` — Gemini CLI 담당
- `src/hooks/` — Gemini CLI 담당
- `src/api/` — Gemini CLI 담당
- `src/utils/` — Gemini CLI 담당
- `src/context/` — Gemini CLI 담당
- `src/types/` — Gemini CLI 담당
- `src/constants/` — Gemini CLI 담당
- `src/styles/` — Gemini CLI 담당

## 행동 규칙

- UI 컴포넌트 구현이 필요한 경우: 직접 생성하지 않고 **사용자에게 Gemini CLI로 구현을 요청하라고 안내**
- 새로운 커스텀 훅이 필요한 경우: 직접 생성하지 않고 **사용자에게 Gemini CLI로 추가를 요청하라고 안내**
- API 함수가 필요한 경우: 직접 생성하지 않고 **사용자에게 Gemini CLI로 추가를 요청하라고 안내**
- 버그를 발견한 경우: 직접 수정하지 않고 **코드 리뷰 형태로 문제를 명시하고 Gemini CLI에 수정을 요청하라고 안내**

## 참조 문서

작업 시 아래 문서를 반드시 참조합니다.

### 프로젝트 구조
- [AI 역할 분담](./docs/02_architecture_ai_responsibilities.md)
- [폴더 구조](./docs/02_architecture_folder_structure.md)

### 코딩 컨벤션 (테스트 코드 작성 기준)
- [네이밍 규칙](./docs/03_coding_conventions_naming_rules.md)
- [타입스크립트 규칙](./docs/03_coding_conventions_typescript.md)

### 테스트 전략
- [테스트 전략 개요](./docs/05_testing_strategy_overview.md)
- [Vitest 단위 테스트](./docs/05_testing_strategy_vitest.md)
- [Vitest + RTL 통합 테스트](./docs/05_testing_strategy_rtl.md)
- [Storybook UI 테스트](./docs/05_testing_strategy_storybook.md)
- [테스트 제외 대상](./docs/05_testing_strategy_exclusion.md)
