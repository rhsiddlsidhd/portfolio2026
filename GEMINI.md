# 프로젝트 기술 가이드

<!--
이 문서는 Gemini-CLI가 이 프로젝트의 코드를 이해하고 수정, 생성할 때 따라야 할 규칙과 가이드라인을 정의합니다.
Gemini-CLI는 이 파일의 내용을 항상 참고하여 일관성 있는 코드를 작성해야 합니다.
-->

## 1. 프로젝트 개요 (Project Overview)

<!-- 프로젝트의 목적, 주요 기술 스택, 핵심 목표 등을 간략하게 설명해 주세요. -->

- 목적 : 나를 소개하는 포트폴리오
- 주요 기술 스택: TypeScript, React, Tailwind CSS

---

## 2. 아키텍처 (Architecture)

### 2.1. 폴더 구조 (Directory Structure)

- **`public/`**: 빌드 과정에 포함되지 않는 정적 자원(예: `robots.txt`, 파비콘)을 위치시킵니다.
- **`src/`**: 모든 소스 코드가 위치합니다.
  - **`api/`**: `axios` 인스턴스 및 API 호출 함수들이 위치합니다.
  - **`assets/`**: 컴포넌트에서 직접 가져와 사용하는 이미지, 폰트 등의 자원이 위치합니다.
  - **`components/`**: Atomic Design 패턴에 따라 UI 컴포넌트를 구조화합니다.
    - **`atoms/`**: UI의 가장 작은 단위. **`shadcn/ui` 라이브러리 컴포넌트로만 구성**합니다. (예: `Button`, `Input`). 새로운 `shadcn/ui` 컴포넌트 추가 시 `npx shadcn-ui@latest add [component]` 명령어를 사용합니다. **이 작업은 Claude Code가 전담하며, Gemini-CLI는 atoms를 직접 추가하거나 수정하지 않습니다.**
    - **`molecules/`**: 여러 `atom`이 결합된 형태의 컴포넌트. (예: `SearchInput`)
    - **`organisms/`**: `atom`과 `molecule`이 결합된, 더 복잡하고 독립적인 UI 영역. (예: `ProjectCard`)
    - **`layout/`**: 페이지의 전체적인 골격을 잡는 컴포넌트. `Header`, `Footer`만 관리합니다.
  - **`constants/`**: API 엔드포인트, 라우팅 경로 등 공통 상수가 위치합니다.
  - **`context/`**: `Context API` 관련 Provider와 커스텀 훅이 위치합니다.
  - **`hooks/`**: 여러 곳에서 재사용 가능한 커스텀 훅(`use...`)이 위치합니다.
  - **`pages/`**: 실제 페이지를 구성하는 메인 컴포넌트가 위치합니다.
  - **`styles/`**: 전역 스타일 및 `tailwind.css` 설정 관련 파일이 위치합니다.
  - **`types/`**: 공통으로 사용되는 TypeScript 타입/인터페이스가 위치합니다. 내부 파일들은 도메인별로 `[도메인명].d.ts` (예: `project.d.ts`, `user.d.ts`) 형식으로 작성하며, `.d.ts` 확장자를 사용하여 순수 타입 정의 파일임을 명시합니다.
  - **`utils/`**: 특정 도메인에 종속되지 않는 순수 유틸리티 함수(예: `formatDate`)가 위치합니다.

#### `src/utils/` (유틸리티 함수)

`src/utils/` 폴더는 **특정 도메인(예: Project, User)에 종속되지 않고 여러 곳에서 재사용 가능한 순수한 유틸리티 함수들**을 모아두는 곳입니다.

**1. 순수 함수 (Pure Function) 지향:**
*   **정의:** 동일한 입력에 대해 항상 동일한 출력을 반환하며, 함수 외부의 어떤 상태도 변경하지 않고, 함수 외부의 상태에도 의존하지 않는 함수입니다.
*   **특징:** 예측 가능성이 높고, 테스트하기 용이하며, 버그 발생률이 낮습니다.
*   **예시:** `formatDate`, `formatCurrency`, `debounce`, `throttle` 등.

**2. 부작용 (Side Effects) 최소화:**
*   유틸리티 함수는 가능한 한 부작용(예: 전역 변수 변경, 콘솔 로깅, 네트워크 요청, DOM 조작, 파일 쓰기/읽기)을 발생시키지 않도록 설계해야 합니다.
*   부득이하게 부작용이 필요한 경우, 함수 스코프 내로 제한하거나 명확히 문서화해야 합니다.

**3. 의존성 (Dependencies) 제한:**
*   외부 라이브러리나 프로젝트 내부의 다른 모듈에 대한 의존성을 최소화합니다.
*   의존성이 필요한 경우, 타입스크립트 인터페이스를 통해 추상화하거나 의존성 주입(Dependency Injection) 패턴을 고려할 수 있습니다.
*   특정 UI 라이브러리(예: React, Next.js)나 전역 상태 관리 라이브러리에 직접적으로 의존하는 유틸리티는 `hooks/` 또는 `context/`와 같은 더 적합한 폴더에 배치하는 것을 고려합니다.

**4. 파일 구조:**
*   각 유틸리티 함수는 일반적으로 하나의 파일에 하나의 함수를 정의하는 것을 권장합니다. (예: `formatDate.ts`, `debounce.ts`)
*   관련된 작은 유틸리티 함수들을 그룹화할 필요가 있다면, 하나의 파일 내에서 `export`할 수도 있습니다.


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

### 2.2. 상태 관리 (State Management)

<!--
전역 상태 관리 방식(예: Redux, Zustand)과 지역 상태 관리 기준을 설명해 주세요.
어떤 상태를 전역으로 관리하고 어떤 상태를 지역으로 관리하는지 명시하면 좋습니다.
-->

- 별도의 전역 상태 관리 라이브러리(Redux, Zustand 등)를 사용하지 않습니다.
- 상태 관리는 React 기본 훅인 `useState`와 `Context API`만을 사용하여 처리합니다.
- 복잡하지 않은 상태는 `useState`를 우선적으로 사용하고, 여러 컴포넌트에 걸쳐 공유되어야 하는 상태의 경우에만 `Context API`를 제한적으로 사용합니다.

### 2.3. 데이터 페칭 (Data Fetching)

<!--
API 통신 방식(예: fetch, axios, react-query), 관련 모듈의 위치, 데이터 모델 등에 대한 규칙을 설명해 주세요.
-->

- **API 로딩**: **API 로딩 중에는 스켈레톤 UI를 사용하여 사용자에게 시각적인 피드백을 제공하는 것을 기본으로 합니다.**
- **통신 라이브러리**: `axios`를 사용하며, `src/api` 폴더에서 중앙 `axios` 인스턴스를 생성하여 `baseURL`, `timeout` 등 공통 설정을 관리합니다.
- **서버 상태**: 단일 페이지 애플리케이션의 복잡도를 고려하여 별도의 서버 상태 관리 라이브러리(SWR, React Query 등)는 사용하지 않습니다.

#### 에러 핸들링 아키텍처

1.  **중앙 처리**: `axios`의 **응답(response) 인터셉터**를 사용하여 모든 API 호출의 에러를 중앙에서 일관되게 처리합니다.
2.  **로직 위임**: 인터셉터는 가로챈 `error` 객체를 `src/api/errorHandler.ts`와 같은 곳에 위치한 **중앙 에러 처리 함수**에 위임합니다.
3.  **에러 분석 및 값 반환**: 중앙 에러 처리 함수는 `error`의 `status` 코드 등을 분석하여 필요한 공통 로직(로깅 등)을 수행한 후, 미리 약속된 **'일정한 에러 값'**을 생성하여 반환합니다.
4.  **Promise `resolve`**: 인터셉터는 중앙 에러 처리 함수로부터 받은 '일정한 에러 값'으로 Promise를 `reject`하지 않고 **`resolve`** 시킵니다.
5.  **결과**: 이를 통해 각각의 API 호출 함수는 `try...catch` 없이도 항상 약속된 형태의 응답을 받게 됩니다. UI 컴포넌트는 이 값을 받아 `error` 필드의 유무로 성공/실패를 판단하여 간결하게 분기 처리를 할 수 있습니다.
6.  **공통 응답 타입 (권장)**: 모든 API 응답은 아래와 같은 공통 타입을 사용하여 타입 안정성을 확보합니다.
    ```typescript
     type ApiError = {
       code: number;
       message: string;
       details?: string;
     };

    type ApiResponse<T> = {
      data: T | null;
      error: ApiError | null;
    };
    ```

#### 에러 메시지 관리 (추가)

프로젝트 전반의 일관성과 유지보수성을 위해, 공통으로 사용되는 에러 메시지는 중앙 집중식으로 관리합니다.

*   **위치:** `src/constants/errorMessages.ts`와 같은 파일을 생성하여 에러 메시지 상수들을 정의합니다.
*   **활용:** `src/api/errorHandler.ts`와 같은 중앙 에러 처리 로직에서 이 상수들을 참조하여 `ApiError` 객체의 `message` 필드를 구성합니다.

```typescript
// src/constants/errorMessages.ts 예시
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
  UNAUTHORIZED: '인증 정보가 유효하지 않습니다. 다시 로그인해주세요.',
  NOT_FOUND: '요청하신 데이터를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 문제가 지속되면 관리자에게 문의해주세요.',
  INVALID_INPUT: '입력값이 유효하지 않습니다.',
  // ... 기타 공통 에러 메시지
};

// src/api/errorHandler.ts에서 활용 예시 (가정)
import { ERROR_MESSAGES } from '../constants/errorMessages';

// ... (기존 에러 처리 로직)

// 예를 들어, HTTP 상태 코드에 따라 메시지를 매핑
const getErrorMessageByStatus = (status: number): string => {
  if (status === 401) return ERROR_MESSAGES.UNAUTHORIZED;
  if (status === 404) return ERROR_MESSAGES.NOT_FOUND;
  if (status >= 500) return ERROR_MESSAGES.SERVER_ERROR;
  return ERROR_MESSAGES.NETWORK_ERROR; // 기본값
};

// 중앙 에러 처리 함수에서 활용
const handleApiError = (error: AxiosError): ApiResponse<any> => {
  const status = error.response?.status || 0;
  const message = getErrorMessageByStatus(status); // 중앙 관리 메시지 활용
  const details = error.response?.data?.message || error.message;

  return {
    data: null,
    error: {
      code: status,
      message: message,
      details: details,
    },
  };
};
```

---

## 3. 코딩 컨벤션 (Coding Conventions)

### 3.1. 네이밍 규칙 (Naming Rules)

#### 기본 원칙

- **컴포넌트, 타입/인터페이스**: `PascalCase` (예: `ProjectCard`, `type Project`)
- **함수, 변수, 파일, 폴더**: `camelCase` (예: `getProjects`, `projectAPI.ts`)
- **상수**: `UPPER_SNAKE_CASE` (예: `MAX_UPLOAD_SIZE`)
- **커스텀 훅**: `use` 접두사를 붙인 `camelCase` (예: `useAuth`)

#### 컴포넌트 네이밍 관점

- **`atoms`**: UI 관점의 이름. (`shadcn/ui`가 제공하는 이름 규칙을 따름)
- **`molecules`**: 재사용 가능한 UI 패턴 관점의 이름. (예: `SearchInput`, `UserBadge`)
- **`organisms`**: 명확한 기능(Feature)/도메인 관점의 이름. (예: `ProjectList`, `UserProfileHeader`)

#### API 함수 네이밍

- 함수의 목적을 명확히 하기 위해 **행위(Action) 동사**를 접두사로 사용합니다.
- **조회**: `get...` (예: `getProjects`)
- **생성**: `create...` 또는 `add...` (예: `createProject`)
- **수정**: `update...` (예: `updateProject`)
- **삭제**: `delete...` (예: `deleteProject`)

#### 타입 정의 파일

- `[도메인명].d.ts` 형식 (예: `project.d.ts`, `api.d.ts`)

#### Boolean 변수 네이밍

- `is...`, `has...`, `should...` 등의 접두사를 사용하여 Boolean 값임을 명확히 합니다. (예: `isLoading`, `hasError`)

### 3.2. 타입스크립트 (TypeScript)

<!--
타입스크립트 사용에 대한 규칙을 정의해 주세요.
예:
- `any` 타입 사용 금지 (불가피한 경우 `unknown` 사용 및 타입 가드 활용)
- 모든 함수 파라미터 및 반환 값에 타입 명시
- `interface` vs `type` 사용 선호도
-->

- **`any` 타입 사용을 금지**합니다. 불가피한 경우 `unknown`을 사용하고 타입 가드를 통해 타입을 좁혀서 사용합니다.
- 모든 함수 파라미터와 반환 값에는 타입을 명시하는 것을 원칙으로 합니다.
- **`type` vs `interface`**: 일관성을 위해 모든 타입 정의는 **`type`** 키워드를 우선적으로 사용합니다. 단, 외부 라이브러리의 타입을 확장(augment)하는 등 **'선언 병합(Declaration Merging)'이 반드시 필요한 경우에만 예외적으로 `interface`를 사용**합니다.

### 3.3. 컴포넌트 작성 스타일

<!--
React 함수형 컴포넌트 작성 시 선호하는 스타일을 정의해 주세요.
예:
- 클래스 컴포넌트 사용 금지
- 컴포넌트 상단에 JSDoc 형식의 주석 권장
- 하나의 파일에 하나의 컴포넌트 정의 원칙
-->

- React 함수형 컴포넌트와 훅(`useState`, `useEffect` 등)을 사용합니다. 클래스 컴포넌트는 사용하지 않습니다.
- 컴포넌트 상단에는 JSDoc 형식으로 간단한 설명을 추가하는 것을 권장합니다.
- 하나의 파일에는 하나의 컴포넌트를 정의하는 것을 원칙으로 합니다. (스타일 컴포넌트 제외)

---

## 4. 스타일 가이드 (Styling Guide)

### 4.1. 스타일링 방식 (Styling Method)

<!--
프로젝트에서 사용하는 스타일링 방식(예: Styled-components, Tailwind CSS, CSS Modules)을 명시하고 그 이유를 설명해 주세요.
-->

- **기본 컴포넌트**: UI의 가장 작은 단위인 **`atoms` 계층은 `shadcn/ui`를 사용**하여 구성합니다. 이는 프로젝트의 기본 컴포넌트 스타일이 되며, 필요한 커스터마이징은 `Tailwind CSS` 유틸리티 클래스를 통해 적용합니다.
- **주요 스타일링 방식**: 이 프로젝트는 **Tailwind CSS v4**를 주요 스타일링 방식으로 사용합니다.
- 유틸리티 우선(utility-first) 접근 방식을 통해 빠르고 일관된 스타일링을 지향합니다.
- **테마 설정**: Tailwind v4에서는 `tailwind.config.js`를 사용하지 않습니다. 테마 커스터마이징은 **CSS 파일 내 `@theme` 디렉티브**와 **CSS 변수**를 통해 관리합니다. shadcn/ui가 초기화 시 생성하는 CSS 변수(`--background`, `--primary` 등)가 프로젝트 테마의 기반입니다.
- **클래스 병합**: 조건부 스타일 적용 시 `@apply`를 사용하지 않습니다. 대신 `shadcn/ui`가 제공하는 **`cn()` 유틸리티 함수** (`clsx` + `tailwind-merge`)를 사용하여 Tailwind 클래스를 안전하게 병합합니다.
  ```typescript
  import { cn } from "@/lib/utils";
  <div className={cn("p-4 text-sm", isActive && "bg-primary text-primary-foreground")} />
  ```

### 4.2. 디자인 시스템 (Design System)

#### 색상 체계 (Color Palette)

`shadcn/ui`의 CSS 변수 기반 색상 시스템을 사용합니다. 모든 색상은 CSS 변수로 정의되며, 다크/라이트 모드에 따라 자동 전환됩니다.

| 용도 | CSS 변수 | 설명 |
|---|---|---|
| 배경/전경 | `--background` / `--foreground` | 페이지 기본 배경과 텍스트 색상 |
| 주요 액션 | `--primary` / `--primary-foreground` | CTA 버튼, 주요 링크 등 핵심 인터랙션 요소 |
| 보조 요소 | `--secondary` / `--secondary-foreground` | 보조 버튼, 태그 등 |
| 강조/포인트 | `--accent` / `--accent-foreground` | 호버 상태, 활성 메뉴 등 미묘한 강조 |
| 뮤트 | `--muted` / `--muted-foreground` | 비활성 텍스트, 플레이스홀더, 보조 설명 |
| 위험/경고 | `--destructive` / `--destructive-foreground` | 삭제, 에러 등 부정적 액션 |
| 카드/팝오버 | `--card` / `--popover` | 카드 및 팝오버 배경 |
| 테두리/입력 | `--border` / `--input` / `--ring` | 구분선, 입력 필드 테두리, 포커스 링 |

> **규칙**: 하드코딩된 색상값(`#fff`, `rgb(...)`) 대신 반드시 CSS 변수를 참조하는 Tailwind 클래스를 사용합니다. (예: `bg-primary`, `text-muted-foreground`)

#### 다크/라이트 모드 (Theme Mode)

- `shadcn/ui`의 CSS 변수 기반 테마 전환을 사용합니다.
- `<html>` 태그의 `class="dark"` 유무로 모드를 전환합니다.
- 모든 컴포넌트는 다크/라이트 모드에서 정상 표시되어야 합니다. 하드코딩된 색상을 사용하지 않으면 자동으로 보장됩니다.

#### 폰트 체계 (Typography)

| 용도 | 클래스 | 비고 |
|---|---|---|
| 본문 | `text-base` (16px) | 기본 읽기 텍스트 |
| 소제목 | `text-lg` ~ `text-xl` | 섹션 내 소제목 |
| 제목 | `text-2xl` ~ `text-4xl` | 페이지/섹션 제목 |
| 캡션/보조 | `text-sm` / `text-xs` | 보조 설명, 날짜, 메타 정보 |
| 폰트 굵기 | `font-normal`, `font-medium`, `font-semibold`, `font-bold` | 계층에 맞게 사용 |

#### 간격 체계 (Spacing)

Tailwind의 기본 간격 스케일(4px 단위)을 사용합니다.

| 용도 | 값 | 예시 |
|---|---|---|
| 요소 내부 여백 (tight) | `p-2` ~ `p-4` (8~16px) | 버튼, 뱃지 내부 |
| 요소 내부 여백 (normal) | `p-4` ~ `p-6` (16~24px) | 카드, 섹션 내부 |
| 요소 간 간격 | `gap-2` ~ `gap-4` (8~16px) | 인라인 요소 간 |
| 섹션 간 간격 | `gap-8` ~ `gap-16` (32~64px) | 페이지 내 섹션 구분 |
| 페이지 좌우 여백 | `px-4` (모바일) / `px-8` (데스크톱) | 컨테이너 좌우 패딩 |

#### 모서리 둥글기 (Border Radius)

shadcn/ui의 `--radius` CSS 변수를 기준으로 통일합니다.

| 용도 | 클래스 | 설명 |
|---|---|---|
| 기본 | `rounded-md` | 버튼, 입력 필드 등 대부분의 요소 |
| 카드/컨테이너 | `rounded-lg` ~ `rounded-xl` | 카드, 모달, 섹션 컨테이너 |
| 원형 | `rounded-full` | 아바타, 뱃지, 아이콘 버튼 |

#### 애니메이션/트랜지션 (Animation & Transition)

- **기본 트랜지션**: 인터랙티브 요소(버튼, 링크, 카드)에는 `transition-colors duration-200`을 기본 적용합니다.
- **모션 감소 존중**: `prefers-reduced-motion` 미디어 쿼리를 존중합니다. Tailwind의 `motion-reduce:` 변형을 활용합니다.
- **페이지 전환/등장 애니메이션**: 필요 시 `opacity`와 `transform`만 사용하여 GPU 가속 애니메이션을 구현합니다. `width`, `height`, `top` 등 레이아웃을 유발하는 속성의 애니메이션은 지양합니다.
- **스크롤 등장 애니메이션**: `IntersectionObserver`를 사용하는 스크롤 등장 애니메이션(예: `AnimatedSection` 컴포넌트)의 `threshold` 값은 **`0.5`**로 설정하여, 요소가 뷰포트의 **50%** 이상 보일 때 애니메이션이 시작되도록 합니다. 추후 필요에 따라 개선합니다.

#### 아이콘 (Icons)

- `lucide-react` 라이브러리를 사용합니다 (shadcn/ui 기본 아이콘 라이브러리).
- 아이콘 크기는 주변 텍스트와 일관되게 `size` prop 또는 `w-4 h-4`, `w-5 h-5` 등의 클래스로 지정합니다.
- 장식용 아이콘에는 `aria-hidden="true"`를, 의미를 전달하는 아이콘에는 적절한 `aria-label`을 부여합니다.

#### 반응형 브레이크포인트 (Responsive Breakpoints)

Tailwind CSS의 기본 브레이크포인트를 사용하며, 모바일 우선(mobile-first) 접근을 따릅니다.

| 접두사 | 최소 너비 | 용도 |
|---|---|---|
| (없음) | 0px | 모바일 기본 |
| `sm:` | 640px | 큰 모바일 / 작은 태블릿 |
| `md:` | 768px | 태블릿 |
| `lg:` | 1024px | 데스크톱 |
| `xl:` | 1280px | 큰 데스크톱 |

#### z-index 관리

레이어 충돌을 방지하기 위해 z-index를 용도별로 구분하여 관리합니다.

| 레이어 | z-index | 용도 |
|---|---|---|
| 기본 콘텐츠 | `z-0` | 일반 페이지 콘텐츠 |
| 플로팅 요소 | `z-10` | 드롭다운, 툴팁 |
| 고정 내비게이션 | `z-30` | 고정 헤더, 사이드바 |
| 모달/오버레이 | `z-40` | 모달 배경, 오버레이 |
| 모달 콘텐츠 | `z-50` | 모달 본문, 최상위 팝업 |

---

## 5. 테스트 전략 (Testing Strategy)

### 5.1. 도구 및 역할 분담

| 도구 | 역할 | 대상 |
|---|---|---|
| **Vitest** | 로직 테스트 (단위/통합) | 유틸리티 함수, 커스텀 훅, API 함수 등 |
| **Storybook** | UI 테스트 (시각적 검증) | atoms, molecules, organisms 컴포넌트 |

### 5.2. Vitest — 로직 테스트

#### 테스트 파일 위치 및 네이밍

- 테스트 파일은 테스트 대상과 **같은 디렉토리**에 위치시킵니다.
- 파일명은 `[대상파일명].test.ts` 형식을 사용합니다.
  ```
  src/utils/formatDate.ts
  src/utils/formatDate.test.ts
  ```

#### 테스트 대상 우선순위

1. **유틸리티 함수** (`src/utils/`): 순수 함수이므로 테스트 작성이 가장 용이합니다. 우선적으로 작성합니다.
2. **커스텀 훅** (`src/hooks/`): `renderHook`을 사용하여 훅의 상태 변화와 반환값을 검증합니다.
3.  **API 함수** (`src/api/`): 요청 URL, 파라미터, 에러 처리 흐름을 검증합니다. 네트워크 요청은 **Mock**하여 외부 의존성을 제거합니다.
    *   **Mocking 전략 (추가)**:
        *   **MSW (Mock Service Worker) 활용:** 실제 네트워크 요청을 가로채어 Mock 응답을 반환하도록 설정할 수 있어, 실제 백엔드 환경과 유사하게 테스트 환경을 구성할 수 있습니다. `MSW`는 브라우저 및 Node.js 환경 모두에서 작동합니다.
        *   **`vi.mock`으로 `axios` 인스턴스 Mocking:** `vitest`의 `vi.mock`을 사용하여 `axios` 인스턴스 자체를 Mocking하거나, `axios` 요청을 래핑하는 API 클라이언트 함수를 Mocking하여 특정 응답을 반환하도록 설정할 수 있습니다. 이는 간단한 단위 테스트에 유용합니다.

#### 테스트 작성 규칙

- `describe`로 테스트 대상을 그룹화하고, `it`(또는 `test`)으로 개별 케이스를 작성합니다.
- 테스트명은 **한글**로 작성하여 의도를 명확히 합니다.
  ```typescript
  describe('formatDate', () => {
    it('ISO 문자열을 YYYY.MM.DD 형식으로 변환한다', () => {
      expect(formatDate('2025-01-15T00:00:00Z')).toBe('2025.01.15');
    });

    it('유효하지 않은 날짜에 빈 문자열을 반환한다', () => {
      expect(formatDate('invalid')).toBe('');
    });
  });
  ```
- 외부 의존성(API 호출, 타이머 등)은 `vi.mock`, `vi.fn`, `vi.useFakeTimers` 등을 사용하여 격리합니다.

#### 실행 명령어

```bash
npx vitest        # watch 모드
npx vitest run    # 단일 실행
```

### 5.3. Storybook — UI 테스트

#### 목적

- 컴포넌트를 **독립된 환경**에서 렌더링하여 다양한 상태(props 조합)를 시각적으로 확인합니다.
- 디자인 시스템의 일관성을 유지하고, 컴포넌트 카탈로그 역할을 겸합니다.

#### Story 파일 위치 및 네이밍

- Story 파일은 컴포넌트와 **같은 디렉토리**에 위치시킵니다.
- 파일명은 `[컴포넌트명].stories.tsx` 형식을 사용합니다.
  ```
  src/components/molecules/SearchInput.tsx
  src/components/molecules/SearchInput.stories.tsx
  ```

#### Story 작성 규칙

- CSF (Component Story Format) 3 형식을 사용합니다.
- 각 Story는 컴포넌트의 주요 상태를 표현합니다.
  ```typescript
  import type { Meta, StoryObj } from '@storybook/react';
  import { SearchInput } from './SearchInput';

  const meta: Meta<typeof SearchInput> = {
    component: SearchInput,
  };
  export default meta;

  type Story = StoryObj<typeof SearchInput>;

  export const Default: Story = {};

  export const WithPlaceholder: Story = {
    args: {
      placeholder: '프로젝트 검색...',
    },
  };

  export const Disabled: Story = {
    args: {
      disabled: true,
    },
  };
  ```

#### Atomic Design 계층별 Story 전략

| 계층 | Story 작성 범위 |
|---|---|
| **atoms** | shadcn/ui 기본 컴포넌트이므로 Story 생략 가능. 커스터마이징한 경우에만 작성 |
| **molecules** | 각 props 조합에 대한 Story 작성 (필수) |
| **organisms** | 주요 상태(로딩, 에러, 빈 데이터, 정상)별 Story 작성 (필수) |

#### 실행 명령어

```bash
npx storybook dev -p 6006    # 개발 서버
npx storybook build           # 정적 빌드
```

### 5.4. 테스트 제외 대상

- `src/components/atoms/`: shadcn/ui 컴포넌트는 라이브러리가 자체적으로 테스트를 보장하므로 별도 테스트를 작성하지 않습니다.
- 단순 레이아웃 컴포넌트(`Header`, `Footer`): 로직이 거의 없으므로 Storybook Story만 작성하고 Vitest 테스트는 생략합니다.
- 페이지 컴포넌트(`src/pages/`): 개별 organisms/molecules 테스트로 대체합니다.
