# Gemini CLI 프로젝트 가이드

<!--
이 문서는 Gemini CLI가 이 프로젝트에서 작업할 때 따라야 할 역할, 범위, 규칙을 정의합니다.
Gemini CLI는 이 파일의 내용을 항상 참고하여 일관성 있는 작업을 수행해야 합니다.
-->

## 역할 정의

Gemini CLI는 이 프로젝트의 **비즈니스 로직, 데이터 연동, 유틸리티 구현 및 로직 테스트**를 전담합니다.

## 담당 영역

- `packages/backend/` — Node.js 서버 로직, API 구현
- `packages/shared/` — 공유 타입 정의, 유틸리티 함수 구현 (백엔드/프론트엔드 공통)
- `packages/frontend/src/hooks/` — 커스텀 훅 설계·구현 (데이터 페칭, 상태 관리 등)
- `packages/frontend/src/api/` — axios 인스턴스 구성, API 함수 작성, 에러 핸들링
- `packages/frontend/src/utils/` — 순수 유틸리티 함수 (부수효과 없는 헬퍼)
- `packages/frontend/src/context/` — Context API 프로바이더 설계·구현
- `packages/frontend/src/types/` — 타입 정의 (API 응답, 도메인 모델, 공유 타입)
- `packages/frontend/src/constants/` — 상수 정의 (API 엔드포인트, 에러 메시지, 라우트 경로)
- `*.test.ts` / `*.test.tsx` — Vitest 단위·통합 테스트 작성
- 디버깅 및 성능 개선

## 접근 금지 영역

아래 폴더의 파일은 **읽기 전용**으로 취급하고 import만 사용합니다. 직접 추가·수정하지 않습니다.

- `packages/frontend/src/components/` — Claude Code 담당 (atoms, molecules, organisms, layout 전체)
- `packages/frontend/src/pages/` — Claude Code 담당
- `packages/frontend/src/styles/` — Claude Code 담당
- `packages/frontend/*.stories.tsx` — Claude Code 담당

## 행동 규칙

- 새로운 UI 컴포넌트가 필요한 경우: 직접 생성하지 않고 **사용자에게 Claude Code로 추가를 요청하라고 안내**
- Storybook story 작성이 필요한 경우: 직접 생성하지 않고 **사용자에게 Claude Code로 작성을 요청하라고 안내**
- 스타일(Tailwind 클래스, CSS 변수) 수정이 필요한 경우: **사용자에게 Claude Code로 수정을 요청하라고 안내**

## 참조 문서

로직 구현 및 테스트 작업 시 아래 문서를 반드시 참조합니다.

- [AI 역할 분담](./docs/02_architecture_ai_responsibilities.md)
- [폴더 구조](./docs/02_architecture_folder_structure.md)
- [네이밍 규칙](./docs/03_coding_conventions_naming_rules.md)
- [타입스크립트 규칙](./docs/03_coding_conventions_typescript.md)
- [상태 관리](./docs/02_architecture_state_management.md)
- [데이터 페칭](./docs/02_architecture_data_fetching.md)
- [Vitest 전략](./docs/05_testing_strategy_vitest.md)
- [테스트 제외 대상](./docs/05_testing_strategy_exclusion.md)
