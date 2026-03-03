# GEMINI Project Overview

이 문서는 Gemini CLI가 프로젝트의 기술 스택, 규칙 및 참조할 문서를 파악하기 위한 핵심 설정 파일입니다.

### 1. 환경 및 언어 (Core & Language)

- **Core**: "React 19"
- **TypeScript**: true
- **Common_Convention**: true

### 2. 스타일 및 라이브러리 (Style & Library)

- **Styling**: "Tailwind CSS v4" # v4 전용 문법 사용 (bg-linear-to-r 등)
- **Animation**: "Native CSS" # Intersection Observer & CSS Transitions 위주
- **UI_Library**: "shadcn/ui" # Radix UI 기반 기본 컴포넌트 활용

### 3. 구조 및 경로 (Structure & Path)

- **Component_Root**: "src/components" # Atomic Design (Atoms, Molecules, Organisms)
- **Data_Root**: "src/data" # JSON 기반 정적 데이터 관리

### 4. 참조 가이드 (Reference Guides)

Gemini CLI는 다음 문서들을 최우선으로 참조하여 작업을 수행합니다.

| 목적 | 가이드 경로 | 주요 내용 |
|---|---|---|
| **컴포넌트 구현 규칙** | [docs/01_component_implementation.md](./docs/01_component_implementation.md) | **Atoms/Molecules 재사용 및 순수 함수 설계** |
| **AI 역할 및 책임** | [docs/01_ai_responsibilities.md](./docs/01_ai_responsibilities.md) | Gemini(구현)와 Claude(테스트)의 경계 |
| **스타일링 방식** | [docs/02_styling_method.md](./docs/02_styling_method.md) | Tailwind v4 규칙 및 cn() 유틸리티 사용 |
| **디자인 시스템** | [docs/02_styling_design_system.md](./docs/02_styling_design_system.md) | 색상(CSS 변수), 간격, 타이포그래피, z-index |
| **테스트 전략** | [docs/03_testing_overview.md](./docs/03_testing_overview.md) | 프로젝트 테스트 구조 및 Claude 협업 방식 |
| **테스트 제외 대상** | [docs/03_testing_exclusion.md](./docs/03_testing_exclusion.md) | 구현 단계에서 고려할 테스트 범위 제외 항목 |
