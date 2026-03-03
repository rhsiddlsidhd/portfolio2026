# 01. 컴포넌트 구현 및 재사용 규칙 (Component Implementation & Reuse)

이 문서는 프로젝트의 UI 일관성, 확장성 및 유지보수성을 극대화하기 위해 Gemini CLI가 준수해야 하는 컴포넌트 설계 및 구현 원칙을 정의합니다.

---

## 1. 계층적 조립 및 Atoms 우선 원칙 (Atomic Reuse)

이 프로젝트는 **Atomic Design** 패턴을 기반으로 UI를 구축하며, 하위 계층의 자산을 상위 계층에서 반드시 재사용해야 합니다.

- **Atoms 우선 사용**: `Molecule`, `Organism` 등을 구현할 때, HTML 원시 태그(`button`, `span`, `a` 등)를 직접 사용하지 않습니다.
- **재료 중심 설계**: `src/components/atoms/`에 정의된 컴포넌트를 최우선 원재료로 사용하여 상위 계층을 조립합니다.
  - 예: 강조 텍스트 버튼 구현 시 `<button>` 대신 `<Button variant="ghost">` 활용.
  - 예: 뱃지/라벨 표시 시 `<span>` 대신 `<Badge>` 활용.

---

## 2. 광범위한 재사용성 원칙 (Broad Reusability)

**재사용 가능성의 범위는 Atoms에 국한되지 않습니다.**

- **Molecule의 자산화**: Molecule 계층 역시 Atoms와 마찬가지로 프로젝트 전반에서 재사용될 수 있는 **'독립적인 UI 패턴 자산'**으로 취급합니다.
- **순수 함수화 (Stateless/Pure)**: Molecule 컴포넌트는 가급적 내부 상태(state)나 특정 비즈니스 로직에 의존하지 않는 **순수 함수(Presentational Component)** 형태로 작성합니다.
- **의존성 주입**: 데이터 원천, 이벤트 핸들러, 내비게이션 로직 등은 반드시 `props`를 통해 외부에서 주입받는 구조를 유지하여, 어떤 맥락에서도 재사용이 가능하도록 설계합니다.

---

## 3. 설계 및 명명 규칙 (Design & Naming)

- **PascalCase**: 모든 컴포넌트 파일명과 컴포넌트명은 `PascalCase`를 유지합니다. (예: `HighlightedText.tsx`)
- **타입 정의**: 컴포넌트 근처에서 `interface`를 사용하여 Props 타입을 명확히 정의하며, 타입 전용 임포트(`import type`)를 생활화합니다.
- **Barrel Export**: 각 계층의 `index.ts`를 통해 컴포넌트를 외부로 노출시켜, 참조 경로의 일관성을 유지합니다.

---

## 4. 구현 체크리스트 (Implementation Checklist)

새로운 컴포넌트를 만들 때 다음 질문을 스스로에게 던집니다:
1. "이 컴포넌트를 구성하는 데 사용할 수 있는 기존 Atoms가 있는가?"
2. "이 컴포넌트(Molecule)는 특정 섹션에 종속되지 않고 다른 곳에서도 쓰일 수 있는가?"
3. "이 컴포넌트는 오직 전달받은 Props에 의해서만 동작하는가?"
