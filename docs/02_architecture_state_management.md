### 2.2. 상태 관리 (State Management)

- 별도의 전역 상태 관리 라이브러리(Redux, Zustand 등)를 사용하지 않습니다.
- 상태 관리는 React 기본 훅인 `useState`와 `Context API`만을 사용하여 처리합니다.
- 복잡하지 않은 상태는 `useState`를 우선적으로 사용하고, 여러 컴포넌트에 걸쳐 공유되어야 하는 상태의 경우에만 `Context API`를 제한적으로 사용합니다.
