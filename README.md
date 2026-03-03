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

이 프로젝트는 Atomic Design 패턴을 충실히 따르며, 관심사 분리를 통해 유지보수성을 극대화했습니다.

```
portfolio/
├── docs/                  # 상세 아키텍처 및 컨벤션 문서 (02~04)
├── public/                # 정적 자산 (이미지, 스킬 아이콘 등)
├── src/
│   ├── components/        # Atomic Design 기반 컴포넌트 (Atoms, Molecules, Organisms)
│   ├── pages/             # 페이지 컴포넌트 및 라우트 뷰
│   ├── routes/            # React Router 7 기반 라우팅 및 데이터 로더
│   ├── hooks/             # 커스텀 훅 (비즈니스 로직 분리)
│   ├── context/           # React Context를 이용한 전역 상태 관리
│   ├── data/              # JSON 기반 정적 데이터 관리 (단일 진실 공급원)
│   ├── types/             # TypeScript 타입/인터페이스 정의
│   ├── styles/            # Tailwind CSS 4 전역 스타일 및 디자인 토큰
│   └── lib/               # 유틸리티 함수 및 프로젝트 설정
├── CLAUDE.md             # Claude Code 역할 정의 (테스트/리뷰)
└── GEMINI.md             # Gemini CLI 역할 정의 (UI/로직 구현)
```

---

## 🛠️ 기술 스택

### Frontend
- **Core**: React 19, TypeScript 5.9, Vite 7
- **Routing**: React Router 7 (Data API 및 Loader 활용)
- **Styling**: Tailwind CSS 4 (v4 전용 문법 사용), shadcn/ui, Radix UI
- **Animation**: Intersection Observer, CSS Transitions
- **Icons**: Lucide React
- **Data**: Static JSON (API 호출 없는 고성능 정적 데이터 구조)

### Dev Tools & Testing
- **AI Agents**: Gemini CLI (Implementation), Claude Code (Test & Review)
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint + TypeScript ESLint

---

## 🤖 AI 협업 개발 구조 (AI-Driven Development)

이 프로젝트는 두 가지 AI 에이전트의 강점을 극대화한 역할 분담 체계로 개발되었습니다. 상세 내용은 [AI 역할 분담 가이드](./docs/01_ai_responsibilities.md)를 참조하세요.

### Gemini CLI (UI 구현 및 비즈니스 로직)
- **Atoms ~ Pages**: 모든 UI 계층의 설계 및 구현
- **Hooks & Context**: 비즈니스 로직 및 상태 관리 구현
- **Architecture**: 컴포넌트 리팩토링 및 아키텍처 설계

### Claude Code (테스트 및 코드 리뷰)
- **Tests**: Vitest 기반 단위·통합 테스트 작성 (Gemini CLI 수정 금지 영역)
- **Stories**: Storybook UI 시각 테스트 작성 (예정)
- **Review**: 구현된 코드의 품질 리뷰 및 버그 리포트

---

## 💡 주요 기술적 챌린지 (Case Study)

이 프로젝트는 단순히 정보를 나열하는 것을 넘어, 실제 개발 과정에서 마주하는 성능 문제를 해결하는 과정을 담고 있습니다.

1. **렌더링 워터폴 제거**: `useEffect` 기반의 지연 로딩을 React Router 7의 `loader`를 이용한 사전 로딩으로 개선하여 렌더링 횟수를 50% 단축했습니다.
2. **이미지 최적화**: WebP 형식과 `srcSet`을 활용하여 디바이스별 최적 이미지를 제공하고, 뷰포트 진입 시점에만 로드되는 지연 로딩을 구현했습니다.
3. **컴포넌트 강조 전략**: `HighlightedText` Molecule을 설계하여 정적인 텍스트 내의 핵심 키워드에 동적 링크와 시각적 강조를 부여했습니다.

---

## 📚 상세 문서 가이드 (Architecture & Strategy)

프로젝트의 세부 규칙은 `docs/` 폴더 내의 문서를 통해 관리됩니다.

- **[01. 컴포넌트 구현 규칙]** : [./docs/01_component_implementation.md](./docs/01_component_implementation.md)
- **[01. AI 역할 분담]** : [./docs/01_ai_responsibilities.md](./docs/01_ai_responsibilities.md)
- **[02. 스타일링 방식]** : [./docs/02_styling_method.md](./docs/02_styling_method.md)
- **[02. 디자인 시스템]** : [./docs/02_styling_design_system.md](./docs/02_styling_design_system.md)
- **[03. 테스트 전략]** : [./docs/03_testing_overview.md](./docs/03_testing_overview.md)
- **[03. 단위 테스트 (Vitest)]** : [./docs/03_testing_vitest.md](./docs/03_testing_vitest.md)
- **[03. 통합 테스트 (RTL)]** : [./docs/03_testing_rtl.md](./docs/03_testing_rtl.md)
- **[03. UI 테스트 (Storybook)]** : [./docs/03_testing_storybook.md](./docs/03_testing_storybook.md)
- **[03. 테스트 제외 대상]** : [./docs/03_testing_exclusion.md](./docs/03_testing_exclusion.md)

---

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 및 기술 증명 용도로 제작되었습니다.
