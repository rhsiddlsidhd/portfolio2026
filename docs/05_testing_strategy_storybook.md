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
