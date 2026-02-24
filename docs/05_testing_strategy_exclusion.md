### 5.4. 테스트 제외 대상

- `src/components/atoms/`: shadcn/ui 컴포넌트는 라이브러리가 자체적으로 테스트를 보장하므로 별도 테스트를 작성하지 않습니다.
- 단순 레이아웃 컴포넌트(`Header`, `Footer`): 로직이 거의 없으므로 Storybook Story만 작성하고 Vitest 테스트는 생략합니다.
- 페이지 컴포넌트(`src/pages/`): 개별 organisms/molecules 테스트로 대체합니다.
