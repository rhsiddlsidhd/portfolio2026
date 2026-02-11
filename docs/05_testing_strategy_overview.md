## 5. 테스트 전략 (Testing Strategy)

### 5.1. 도구 및 역할 분담

| 도구 | 역할 | 대상 |
|---|---|---|
| **Vitest** | 로직 테스트 (단위/통합) | 유틸리티 함수, 커스텀 훅, API 함수 등 |
| **Storybook** | UI 테스트 (시각적 검증) | atoms, molecules, organisms 컴포넌트 |

#### AI 도구별 테스트 담당

| 테스트 도구 | 담당 AI |
|---|---|
| **Storybook** (UI 시각 테스트) | Claude Code |
| **Vitest** (로직 단위/통합 테스트) | Gemini CLI |
