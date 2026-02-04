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
