# 프론트엔드 포트폴리오 2026

**Atomic Design 기반의 체계적인 컴포넌트 설계와 AI 협업을 통해 구축한 고성능 개인 포트폴리오**

TypeScript + React 19 + Tailwind CSS 4를 활용하여 성능 최적화와 사용자 경험(UX)을 극대화한 모던 프론트엔드 프로젝트입니다.

---

## 🚀 빠른 시작

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 서버 (Vite)
npm run dev
```

### 빌드 및 테스트
```bash
# 프로덕션 빌드
npm run build

# 린트 검사
npm run lint

# 테스트 실행 (Vitest)
npm run test
```

---

## 📦 프로젝트 구조

이 프로젝트는 초기 Monorepo 구조에서 생산성과 유지보수성을 위해 단일 패키지 구조로 리팩터링되었습니다.

```
portfolio/
├── docs/                  # 상세 아키텍처 및 컨벤션 문서
├── public/                # 정적 자산 (이미지, 스킬 아이콘 등)
├── src/
│   ├── components/        # Atomic Design 기반 컴포넌트 (Atoms, Molecules, Organisms)
│   ├── pages/             # 페이지 컴포넌트
│   ├── routes/            # React Router 7 기반 라우팅 및 Data API(Loader)
│   ├── hooks/             # 커스텀 훅 (비즈니스 로직 분리)
│   ├── context/           # React Context를 이용한 전역 상태 관리
│   ├── data/              # JSON 기반 정적 데이터
│   ├── types/             # TypeScript 타입 정의
│   ├── styles/            # Tailwind CSS 4 전역 스타일
│   └── lib/               # 유틸리티 함수 및 설정
├── CLAUDE.md             # Claude Code 역할 정의 (테스트/리뷰)
└── GEMINI.md             # Gemini CLI 역할 정의 (UI/로직 구현)
```

---

## 🛠️ 기술 스택

### Frontend
- **Core**: React 19, TypeScript 5.9, Vite 7
- **Routing**: React Router 7 (Data API 활용)
- **Styling**: Tailwind CSS 4, shadcn/ui, Radix UI
- **Animation**: Embla Carousel, Intersection Observer
- **Icons**: Lucide React
- **State**: Zustand (전역 상태), React Context (컴포넌트 로컬 상태)

### Dev Tools & Testing
- **AI Agents**: Gemini CLI (Implementation), Claude Code (Test & Review)
- **Testing**: Vitest, React Testing Library, JSDOM, Playwright
- **Linting**: ESLint + TypeScript ESLint
- **Compiler**: React Compiler, SWC

---

## 🤖 AI 협업 개발 구조

이 프로젝트는 두 가지 AI 에이전트의 강점을 극대화한 역할 분담 체계로 개발되었습니다.

### Gemini CLI (UI 구현 및 비즈니스 로직)
- **Atoms ~ Pages**: 모든 UI 계층의 설계 및 구현
- **Hooks & Context**: 데이터 페칭 및 상태 관리 로직
- **Performance**: 렌더링 워터폴 제거 및 성능 최적화

### Claude Code (테스트 및 코드 리뷰)
- **Tests**: Vitest 기반 단위·통합 테스트 작성
- **Stories**: Storybook UI 시각 테스트 (예정)
- **Review**: Gemini CLI가 구현한 코드에 대한 품질 리뷰

---

## 💡 주요 기술적 챌린지 (Case Study)

이 프로젝트는 단순히 정보를 나열하는 것을 넘어, 실제 개발 과정에서 마주하는 성능 문제를 해결하는 과정을 담고 있습니다.

1. **렌더링 워터폴 제거**: `useEffect` 기반의 지연 로딩을 React Router 7의 `loader`를 이용한 사전 로딩으로 개선하여 렌더링 횟수를 50% 단축했습니다.
2. **이미지 최적화**: WebP 형식과 `srcSet`을 활용하여 디바이스별 최적 이미지를 제공하고, 뷰포트 진입 시점에만 로드되는 지연 로딩을 구현했습니다.
3. **애니메이션 동기화**: `IntersectionObserver`와 Context API를 활용하여 이미지가 완전히 로드된 시점에만 애니메이션이 실행되도록 제어하여 시각적 깜빡임을 해결했습니다.

---

## 📊 데이터 구조

### `src/data/user.json`
개인 프로필 정보 및 헤드라인 관리

### `src/data/skills.json`
25개 이상의 기술 스택 정보 (아이콘 경로는 ID 기반 동적 생성)

### `src/data/projects.json`
상세 상세 정보 및 도전 과제(Challenges) 관리 (`retrospect` 필드는 챌린지 섹션 집중을 위해 제거됨)

---

## 📚 문서 리스트

- [AI 역할 분담](./docs/02_architecture_ai_responsibilities.md)
- [폴더 구조](./docs/02_architecture_folder_structure.md)
- [데이터 페칭 전략](./docs/02_architecture_data_fetching.md)
- [네이밍 규칙](./docs/03_coding_conventions_naming_rules.md)
- [테스트 전략](./docs/05_testing_strategy_overview.md)

---

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 및 기술 증명 용도로 제작되었습니다.
