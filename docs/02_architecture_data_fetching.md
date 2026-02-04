### 2.3. 데이터 페칭 (Data Fetching)

- **API 로딩**: **API 로딩 중에는 스켈레톤 UI를 사용하여 사용자에게 시각적인 피드백을 제공하는 것을 기본으로 합니다.**
- **통신 라이브러리**: `axios`를 사용하며, `src/api` 폴더에서 중앙 `axios` 인스턴스를 생성하여 `baseURL`, `timeout` 등 공통 설정을 관리합니다.
- **서버 상태**: 단일 페이지 애플리케이션의 복잡도를 고려하여 별도의 서버 상태 관리 라이브러리(SWR, React Query 등)는 사용하지 않습니다.

#### 에러 핸들링 아키텍처

1.  **중앙 처리**: `axios`의 **응답(response) 인터셉터**를 사용하여 모든 API 호출의 에러를 중앙에서 일관되게 처리합니다.
2.  **로직 위임**: 인터셉터는 가로챈 `error` 객체를 `src/api/errorHandler.ts`와 같은 곳에 위치한 **중앙 에러 처리 함수**에 위임합니다.
3.  **에러 분석 및 값 반환**: 중앙 에러 처리 함수는 `error`의 `status` 코드 등을 분석하여 필요한 공통 로직(로깅 등)을 수행한 후, 미리 약속된 **'일정한 에러 값'**을 생성하여 반환합니다.
4. **Promise `reject`**: 인터셉터는 중앙 에러 처리 함수로부터 받은 `ApiError` 객체로 Promise를 **`reject`** 시킵니다.
5. **결과**: API 호출 함수는 `Promise.catch()` 블록을 통해 에러를 명시적으로 처리해야 합니다. 이를 통해 성공적인 응답(`AxiosResponse`의 `data` 속성)과 에러 응답(`ApiError` 객체)을 명확하게 분리하여 처리할 수 있습니다. `ApiResponse` 타입은 API 응답 데이터를 래핑하여 표준화할 때 사용합니다.
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
const handleApiError = (error: AxiosError): ApiError => { // ApiResponse<any> 대신 ApiError 반환으로 수정
  const status = error.response?.status || 0;
  const message = getErrorMessageByStatus(status); // 중앙 관리 메시지 활용
  const details = error.response?.data?.message || error.message;

  return {
    code: status,
    message: message,
    details: details,
  };
};
```
