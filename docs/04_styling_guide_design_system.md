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
