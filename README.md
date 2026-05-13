# 포트폴리오 2026

> 렌더링 흐름과 네트워크 구조를 이해하고, 사용자가 실제로 느끼는 속도를 설계하는 프론트엔드 개발자의 포트폴리오

단순한 정보 나열이 아닌, 실제 성능 병목을 발견하고 구조적으로 해결한 과정을 담은 개인 포트폴리오입니다.

➡️ [배포 링크](https://portfolio2026-2nbc.vercel.app/) | [GitHub](https://github.com/rhsiddlsidhd/portfolio2026)

---

## 📌 프로젝트 개요

| 항목 | 내용 |
| :--- | :--- |
| **기간** | 2026.01 ~ (진행 중) |
| **역할** | 프론트엔드 개발 (설계 · 구현 · 배포) |
| **배경** | 기능 나열형 포트폴리오가 아닌, 성능 문제를 발견하고 구조적으로 해결하는 과정을 보여주는 기술 증명 포트폴리오 |

---

## 🛠 Tech Stack

| 분류 | 기술 |
| :--- | :--- |
| **Frontend** | TypeScript 5.9, React 19, Vite 7 |
| **Routing** | React Router 7 (Data API · Loader) |
| **Styling** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **Animation** | Native CSS (Intersection Observer, CSS Transitions) |
| **State** | Zustand, React Context |
| **Testing** | Vitest, React Testing Library |
| **CI/CD** | GitHub, Vercel |

---

## 💡 주요 기능 (Key Features)

- **렌더링 워터폴 제거**: `useEffect` 기반 데이터 페칭을 React Router 7 `loader`로 전환하여 라우터 레이어에서 사전 로딩
- **번들 최적화**: 라우트 기반 코드 스플리팅 + 라이브러리별 벤더 청크 분리로 번들 사이즈 47% 감소 (443KB → 233KB)
- **이미지 최적화**: WebP 변환 · `srcSet` 반응형 이미지 · `fetchPriority="high"` LCP 타겟 설정 · 뷰포트 외 지연 로딩
- **다크/라이트 모드**: 시스템 테마 감지 및 동기화

---

## 🏗 아키텍처 (Architecture)

### 렌더링 전략

| 구분 | 선택 | 이유 |
| :--- | :--- | :--- |
| **데이터 소스** | Static JSON | API 없는 정적 데이터 → 빌드 타임 최적화, 서버 비용 없음 |
| **렌더링 방식** | CSR (SPA) | 페이지 전환 UX 우선, 정적 배포로 TTFB 최소화 |
| **데이터 페칭** | Router Loader | 컴포넌트 마운트 전 데이터 준비 → Cascading Render 제거 |

### 상태 관리 기준

| 상태 유형 | 도구 | 기준 |
| :--- | :--- | :--- |
| **전역 UI 상태** | Zustand | 다크모드 등 여러 컴포넌트가 공유하는 상태 |
| **컴포넌트 상태** | React Context | 트리 내 범위가 한정된 공유 상태 |
| **지역 상태** | useState | 단일 컴포넌트 내부 상태 |

---

## 🔥 트러블슈팅 (Troubleshooting)

### 1. Cascading Render (렌더링 워터폴)

**Problem**
`useEffect` 기반 데이터 페칭으로 `Render → 빈 화면 → Fetch → Re-render` 사이클이 발생. 불필요한 빈 화면 노출과 이중 렌더링이 UX를 저해.

**Solution**
React Router 7의 Data API `loader`를 도입하여 데이터 페칭 책임을 라우터 레이어로 이전. 컴포넌트는 첫 렌더링 시 완성된 데이터를 보유.

**Impact**
불필요한 Re-render 제거. 첫 렌더링 사이클에서 완성된 UI 제공. 렌더링 횟수 50% 단축.

---

### 2. 번들 사이즈 과부하

**Problem**
단일 번들 파일로 초기 로딩 속도 저하. 사용하지 않는 페이지의 코드까지 즉시 다운로드됨.

**Solution**
라우트 기반 코드 스플리팅으로 페이지별 청크 분리. 라이브러리별 벤더 청크를 별도 분리하여 캐싱 효율 극대화. 번들 분석기(`rollup-plugin-visualizer`)로 분리 지점 식별 후 적용.

**Impact**
메인 번들 47% 감소 (443KB → 233KB). 초기 로딩 속도 개선 및 캐싱 효율 향상.

---

### 3. 이미지 네트워크 낭비 및 LCP 저하

**Problem**
뷰포트 밖 이미지가 초기 페이지 로드 시 즉시 다운로드되어 불필요한 네트워크 리소스 낭비. 히어로 이미지의 LCP 수치 저하.

**Solution**
뷰포트 외 이미지에 native `loading="lazy"` 적용. 히어로 이미지는 `fetchPriority="high"` · `loading="eager"` 설정. WebP 변환 및 반응형 `srcSet`으로 디바이스별 최적 이미지 제공.

**Impact**
초기 네트워크 요청을 뷰포트 내 콘텐츠로 한정. 불필요한 대용량 이미지 전송 감소. LCP 수치 개선.

---

## 📦 프로젝트 구조

```
src/
├── components/   # Atomic Design (Atoms, Molecules, Organisms)
├── pages/        # 페이지 컴포넌트
├── routes/       # React Router 7 라우팅 및 Loader
├── hooks/        # 커스텀 훅 (비즈니스 로직 분리)
├── context/      # React Context 전역 상태
├── data/         # Static JSON (단일 진실 공급원)
├── types/        # TypeScript 타입 정의
├── styles/       # Tailwind CSS 4 전역 스타일
└── lib/          # 유틸리티 함수
```
