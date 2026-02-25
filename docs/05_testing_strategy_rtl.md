### 5.3. Vitest + React Testing Library — 통합 테스트

> 통합 테스트 파일의 작성은 **Claude Code**가 담당합니다.

#### 목적

- 컴포넌트가 실제 DOM에 렌더링된 결과와 사용자 인터랙션을 검증합니다.
- 훅과 컴포넌트의 연동, 라우터 흐름, API 연동 결과 등 **여러 단위가 조합된 흐름**을 테스트합니다.

#### 테스트 파일 위치 및 네이밍

- 테스트 파일은 테스트 대상과 **같은 디렉토리**에 위치시킵니다.
- 파일명은 `[대상파일명].test.tsx` 형식을 사용합니다.
  ```
  src/components/molecules/SearchInput.tsx
  src/components/molecules/SearchInput.test.tsx
  ```

#### 테스트 대상

| 대상 | 설명 |
|---|---|
| **molecules / organisms** | 렌더링 결과, 사용자 인터랙션(클릭, 입력 등) 검증 |
| **커스텀 훅 + 컴포넌트 조합** | 훅의 상태 변화가 UI에 올바르게 반영되는지 검증 |
| **React Router 흐름** | 라우터 이동, 파라미터 전달, 리다이렉트 동작 검증 |
| **API 연동** | 데이터 fetching 후 렌더링 결과 검증 (MSW로 API Mocking) |

#### 테스트 작성 규칙

- RTL의 `render`, `screen`, `userEvent`를 사용합니다.
- 쿼리는 접근성 기반 우선순위를 따릅니다: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- 테스트명은 **한글**로 작성합니다.

  ```typescript
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { SearchInput } from './SearchInput';

  describe('SearchInput', () => {
    it('입력값이 변경되면 onChange 핸들러가 호출된다', async () => {
      const handleChange = vi.fn();
      render(<SearchInput onChange={handleChange} />);

      await userEvent.type(screen.getByRole('textbox'), '검색어');

      expect(handleChange).toHaveBeenCalled();
    });

    it('disabled 상태일 때 입력이 불가능하다', () => {
      render(<SearchInput disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });
  ```

#### React Router 테스트 패턴

- `MemoryRouter` 또는 `createMemoryRouter`로 라우터 컨텍스트를 제공합니다.

  ```typescript
  import { MemoryRouter } from 'react-router-dom';

  describe('ProjectCard', () => {
    it('카드 클릭 시 프로젝트 상세 페이지로 이동한다', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <ProjectCard id="1" title="포트폴리오" />
        </MemoryRouter>
      );

      await userEvent.click(screen.getByRole('link'));

      expect(screen.getByText('포트폴리오')).toBeInTheDocument();
    });
  });
  ```

#### API Mocking 전략

- **MSW (Mock Service Worker)**: 실제 네트워크 요청을 가로채어 Mock 응답을 반환합니다. 통합 테스트에서 권장합니다.
- **`vi.mock`**: 간단한 API 함수 Mocking에 사용합니다.

#### 실행 명령어

```bash
npx vitest        # watch 모드
npx vitest run    # 단일 실행
```
