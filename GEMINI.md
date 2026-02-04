# 프로젝트 기술 가이드

<!--
이 문서는 Gemini-CLI가 이 프로젝트의 코드를 이해하고 수정, 생성할 때 따라야 할 규칙과 가이드라인을 정의합니다.
Gemini-CLI는 이 파일의 내용을 항상 참고하여 일관성 있는 코드를 작성해야 합니다.
-->

## 개요

이 문서는 프로젝트의 기술 스택, 아키텍처, 코딩 컨벤션, 스타일 가이드 및 테스트 전략에 대한 규칙과 가이드라인을 정의합니다. Gemini-CLI는 이 문서들을 참고하여 일관성 있는 코드 작성 및 유지보수를 수행합니다.

자세한 내용은 각 섹션의 링크를 참조하십시오.

---

## 목차

- [0. 프로젝트 기획안](./docs/00_project_plan.md)
- [1. 프로젝트 개요](./docs/01_project_overview.md)
- [2. 아키텍처](./docs/02_architecture_folder_structure.md)
  - [2.1. 폴더 구조](./docs/02_architecture_folder_structure.md)
    - [유틸리티 함수](./docs/02_architecture_folder_structure.md#srcutils-유틸리티-함수)
  - [2.1.1. AI 도구별 역할 분담](./docs/02_architecture_ai_responsibilities.md)
  - [2.2. 상태 관리](./docs/02_architecture_state_management.md)
  - [2.3. 데이터 페칭](./docs/02_architecture_data_fetching.md)
    - [에러 핸들링 아키텍처](./docs/02_architecture_data_fetching.md#에러-핸들링-아키텍처)
    - [에러 메시지 관리](./docs/02_architecture_data_fetching.md#에러-메시지-관리-추가)
- [3. 코딩 컨벤션](./docs/03_coding_conventions_naming_rules.md)
  - [3.1. 네이밍 규칙](./docs/03_coding_conventions_naming_rules.md)
  - [3.2. 타입스크립트](./docs/03_coding_conventions_typescript.md)
  - [3.3. 컴포넌트 작성 스타일](./docs/03_coding_conventions_component_style.md)
- [4. 스타일 가이드](./docs/04_styling_guide_method.md)
  - [4.1. 스타일링 방식](./docs/04_styling_guide_method.md)
  - [4.2. 디자인 시스템](./docs/04_styling_guide_design_system.md)
    - [색상 체계](./docs/04_styling_guide_design_system.md#색상-체계-color-palette)
    - [다크/라이트 모드](./docs/04_styling_guide_design_system.md#다크라이트-모드-theme-mode)
    - [폰트 체계](./docs/04_styling_guide_design_system.md#폰트-체계-typography)
    - [간격 체계](./docs/04_styling_guide_design_system.md#간격-체계-spacing)
    - [모서리 둥글기](./docs/04_styling_guide_design_system.md#모서리-둥글기-border-radius)
    - [애니메이션/트랜지션](./docs/04_styling_guide_design_system.md#애니메이션트랜지션-animation--transition)
    - [아이콘](./docs/04_styling_guide_design_system.md#아이콘-icons)
    - [반응형 브레이크포인트](./docs/04_styling_guide_design_system.md#반응형-브레이크포인트-responsive-breakpoints)
    - [z-index 관리](./docs/04_styling_guide_design_system.md#z-index-관리)
- [5. 테스트 전략](./docs/05_testing_strategy_overview.md)
  - [5.1. 도구 및 역할 분담](./docs/05_testing_strategy_overview.md)
  - [5.2. Vitest — 로직 테스트](./docs/05_testing_strategy_vitest.md)
    - [테스트 파일 위치 및 네이밍](./docs/05_testing_strategy_vitest.md#테스트-파일-위치-및-네이밍)
    - [테스트 대상 우선순위](./docs/05_testing_strategy_vitest.md#테스트-대상-우선순위)
    - [테스트 작성 규칙](./docs/05_testing_strategy_vitest.md#테스트-작성-규칙)
    - [실행 명령어](./docs/05_testing_strategy_vitest.md#실행-명령어)
  - [5.3. Storybook — UI 테스트](./docs/05_testing_strategy_storybook.md)
    - [목적](./docs/05_testing_strategy_storybook.md#목적)
    - [Story 파일 위치 및 네이밍](./docs/05_testing_strategy_storybook.md#story-파일-위치-및-네이밍)
    - [Story 작성 규칙](./docs/05_testing_strategy_storybook.md#story-작성-규칙)
    - [Atomic Design 계층별 Story 전략](./docs/05_testing_strategy_storybook.md#atomic-design-계층별-story-전략)
    - [실행 명령어](./docs/05_testing_strategy_storybook.md#실행-명령어)
  - [5.4. 테스트 제외 대상](./docs/05_testing_strategy_exclusion.md)
