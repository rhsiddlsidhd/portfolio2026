### 5.2. Vitest — 단위 테스트

> Vitest 단위 테스트 파일의 작성은 **Claude Code**가 담당합니다.

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
3. **API 함수** (`src/api/`): 요청 URL, 파라미터, 에러 처리 흐름을 검증합니다. 네트워크 요청은 `vi.mock`으로 격리합니다.

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
