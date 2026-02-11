# Claude Code 프로젝트 가이드

<!--
이 문서는 Claude Code가 이 프로젝트에서 작업할 때 따라야 할 역할, 범위, 규칙을 정의합니다.
Claude Code는 이 파일의 내용을 항상 참고하여 일관성 있는 작업을 수행해야 합니다.
-->

## 역할 정의

Claude Code는 이 프로젝트의 **UI 구조 설계 및 컴포넌트 구현**을 전담합니다.

## 담당 영역

- `src/components/atoms/` — shadcn/ui 컴포넌트 검색, 설치(`npx shadcn-ui@latest add`), 초기 구성 및 커스터마이징
- `src/components/molecules/` — atom 조합 컴포넌트 설계·구현
- `src/components/organisms/` — 복합 UI 영역 설계·구현
- `src/components/layout/` — Header, Footer 등 레이아웃 컴포넌트
- `src/pages/` — 페이지 컴포넌트 구조 설계·구현
- `src/styles/` — Tailwind 테마, 디자인 토큰, 전역 스타일
- `*.stories.tsx` — Storybook story 작성 (UI 시각 테스트)

## 접근 금지 영역

아래 폴더의 파일은 **읽기 전용**으로 취급하고 import만 사용합니다. 직접 추가·수정하지 않습니다.

- `src/hooks/` — Gemini CLI 담당
- `src/api/` — Gemini CLI 담당
- `src/utils/` — Gemini CLI 담당
- `src/context/` — Gemini CLI 담당
- `src/types/` — Gemini CLI 담당 (단, 컴포넌트 Props 타입은 컴포넌트 파일 내에서 직접 정의 가능)
- `src/constants/` — Gemini CLI 담당
- `*.test.ts` / `*.test.tsx` — Gemini CLI 담당

## 행동 규칙

- 새로운 커스텀 훅이 필요한 경우: 직접 생성하지 않고 **사용자에게 Gemini CLI로 추가를 요청하라고 안내**
- API 함수가 필요한 경우: 직접 생성하지 않고 **사용자에게 Gemini CLI로 추가를 요청하라고 안내**
- Vitest 테스트 작성이 필요한 경우: **사용자에게 Gemini CLI로 작성을 요청하라고 안내**

## 참조 문서

컴포넌트 작업 시 아래 문서를 반드시 참조합니다.

- [AI 역할 분담](./docs/02_architecture_ai_responsibilities.md)
- [폴더 구조](./docs/02_architecture_folder_structure.md)
- [컴포넌트 작성 스타일](./docs/03_coding_conventions_component_style.md)
- [네이밍 규칙](./docs/03_coding_conventions_naming_rules.md)
- [타입스크립트 규칙](./docs/03_coding_conventions_typescript.md)
- [스타일링 방식](./docs/04_styling_guide_method.md)
- [디자인 시스템](./docs/04_styling_guide_design_system.md)
- [Storybook 전략](./docs/05_testing_strategy_storybook.md)
