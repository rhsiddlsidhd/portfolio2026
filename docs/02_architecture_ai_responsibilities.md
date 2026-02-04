### 2.1.1. AI 도구별 역할 분담 (AI Tool Responsibilities)

이 프로젝트는 두 가지 AI 도구를 사용하며, 각 도구의 작업 범위가 명확히 구분됩니다.

- **Claude Code** (shadcn/ui MCP 서버 연결): `atoms/` 계층의 shadcn/ui 컴포넌트 검색, 설치, 초기 구성을 전담합니다.
- **Gemini CLI**: atoms가 이미 구성되어 있다고 가정하고, `molecules/`, `organisms/`, `layout/`, `pages/` 등 상위 계층 작업에 집중합니다.

#### Gemini CLI 행동 규칙

| 상황 | Gemini CLI 행동 |
|---|---|
| `components/atoms/` 하위 파일 추가/수정 | **금지** — atoms는 읽기 전용으로 취급하고 import만 사용 |
| 새로운 atom이 필요한 경우 | 직접 생성하지 않고 **사용자에게 Claude Code로 추가를 요청하라고 안내** |
| 컴포넌트 작업 시작 시 | atoms부터 만들지 않고 **기존 atoms가 있다고 가정**하여 molecules/organisms부터 작업 |
| `npx shadcn-ui@latest add` 명령어 | **실행하지 않음** — Claude Code 영역 |

#### Gemini CLI 집중 영역

- `src/components/molecules/`, `src/components/organisms/`, `src/components/layout/`
- `src/pages/`, `src/hooks/`, `src/api/`, `src/types/`, `src/utils/`, `src/context/`
