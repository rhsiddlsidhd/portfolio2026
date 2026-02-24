### 5.2. Vitest — 로직 테스트

> Vitest 테스트 파일의 작성은 **Gemini CLI**가 로직 구현과 함께 담당합니다.

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
