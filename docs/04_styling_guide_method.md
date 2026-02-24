### 4.1. 스타일링 방식 (Styling Method)

- **기본 컴포넌트**: UI의 가장 작은 단위인 **`atoms` 계층은 `shadcn/ui`를 사용**하여 구성합니다. 이는 프로젝트의 기본 컴포넌트 스타일이 되며, 필요한 커스터마이징은 `Tailwind CSS` 유틸리티 클래스를 통해 적용합니다.
- **주요 스타일링 방식**: 이 프로젝트는 **Tailwind CSS v4**를 주요 스타일링 방식으로 사용합니다.
- 유틸리티 우선(utility-first) 접근 방식을 통해 빠르고 일관된 스타일링을 지향합니다.
- **테마 설정**: Tailwind v4에서는 `tailwind.config.js`를 사용하지 않습니다. 테마 커스터마이징은 **CSS 파일 내 `@theme` 디렉티브**와 **CSS 변수**를 통해 관리합니다. shadcn/ui가 초기화 시 생성하는 CSS 변수(`--background`, `--primary` 등)가 프로젝트 테마의 기반입니다.
- **클래스 병합**: 조건부 스타일 적용 시 `@apply`를 사용하지 않습니다. 대신 `shadcn/ui`가 제공하는 **`cn()` 유틸리티 함수** (`clsx` + `tailwind-merge`)를 사용하여 Tailwind 클래스를 안전하게 병합합니다.
  ```typescript
  import { cn } from "@/lib/utils";
  <div className={cn("p-4 text-sm", isActive && "bg-primary text-primary-foreground")} />
  ```
