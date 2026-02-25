# Gemini CLI 프로젝트 가이드

<!--
이 문서는 Gemini CLI가 이 프로젝트에서 작업할 때 따라야 할 역할, 범위, 규칙을 정의합니다.
Gemini CLI는 이 파일의 내용을 항상 참고하여 일관성 있는 작업을 수행해야 합니다.
-->

## 역할 정의

Gemini CLI는 이 프로젝트의 **UI 컴포넌트 구현(atoms~pages) 및 로직 영역(hooks, api, utils 등)**을 전담합니다.

## 담당 영역

- `src/components/atoms/` — shadcn/ui 컴포넌트 검색, 설치, 초기 구성 및 커스터마이징
- `src/components/molecules/` — atom 조합 컴포넌트 설계·구현
- `src/components/organisms/` — 복합 UI 영역 설계·구현
- `src/components/layout/` — Header, Footer 등 레이아웃 컴포넌트
- `src/pages/` — 페이지 컴포넌트 구조 설계·구현
- `src/styles/` — Tailwind 테마, 디자인 토큰, 전역 스타일
- `src/hooks/` — 커스텀 훅 설계·구현
- `src/api/` — API 클라이언트 구성, 요청 함수 작성, 에러 핸들링
- `src/utils/` — 순수 유틸리티 함수 구현
- `src/context/` — Context API 프로바이더 설계·구현
- `src/types/` — 타입 정의 (API 응답, 도메인 모델, 공유 타입)
- `src/constants/` — 상수 정의 (API 엔드포인트, 에러 메시지, 라우트 경로)
- 디버깅 및 성능 개선

## 접근 금지 영역

아래 파일들은 **읽기 전용**으로 취급하며 직접 추가하거나 수정하지 않습니다.

- `*.test.ts` / `*.test.tsx` — Claude Code 담당
- `*.stories.tsx` — Claude Code 담당

## 행동 규칙

- **테스트 요청:** 컴포넌트나 로직 구현 완료 후, 사용자에게 **Claude Code로 테스트 코드 작성 및 코드 리뷰를 요청**하라고 안내합니다.
- **버그 수정:** 버그 수정 시 Claude Code의 리뷰 피드백을 우선적으로 고려하며, 수정 후 다시 리뷰를 요청하도록 안내합니다.
- **shadcn/ui:** 필요한 경우 `npx shadcn-ui@latest add` 명령어를 직접 실행하여 UI 라이브러리를 구축합니다.

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
