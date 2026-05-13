## 5. 테스트 전략 (Testing Strategy)

### 5.1. 도구 및 역할 분담

| 도구 | 테스트 종류 | 파일 패턴 | 대상 |
|---|---|---|---|
| **Vitest** | 단위 테스트 | `*.test.ts` | 유틸리티 함수, 커스텀 훅, API 함수 |
| **Vitest + React Testing Library** | 통합 테스트 | `*.test.tsx` | 컴포넌트, 라우터 흐름, 훅+컴포넌트 조합 |
| **Storybook** | UI 테스트 (시각적 검증) | `*.stories.tsx` | atoms, molecules, organisms 컴포넌트 |

#### AI 도구별 테스트 담당

| 테스트 도구 | 담당 AI |
|---|---|
| **Vitest** (단위 테스트) | Claude Code |
| **Vitest + RTL** (통합 테스트) | Claude Code |
| **Storybook** (UI 시각 테스트) | Claude Code |
