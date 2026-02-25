import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { createMemoryRouter, RouterProvider, useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import type { IProject } from '@/types/project';
import projectsData from '@/data/projects.json';

// ─────────────────────────────────────────────────────────────────────────────
// 테스트 대상: portfolio-2026 프로젝트 상세 페이지 진입 방식 비교
//
// 핵심 질문:
//   "사용자가 프로젝트 상세 페이지에 들어갈 때, 화면이 몇 번 그려지는가?"
//
// Case A (구방식): 화면이 먼저 뜨고, 그 다음에 데이터를 가져온다
//   → 화면을 두 번 그린다 (빈 화면 1번 + 데이터 채운 화면 1번)
//
// Case B (현재방식): 데이터를 먼저 준비하고, 완성된 상태로 화면을 그린다
//   → 화면을 한 번만 그린다 (처음부터 데이터가 있는 화면)
//
// ※ RTL 주의사항:
//   RTL의 render()는 내부적으로 act()로 감싸 effects를 즉시 flush한다.
//   따라서 DOM 스냅샷으로 "첫 화면의 빈 상태"를 직접 캡처하는 것은 불가능하다.
//   대신, 화면을 그리는 과정에서 빈 상태가 존재했는지를 플래그(flag)로 추적하여 증명한다.
// ─────────────────────────────────────────────────────────────────────────────
const TARGET_ID = 'portfolio-2026';
const TARGET_NAME = 'Portfolio2026';

// ─────────────────────────────────────────────────────────────────────────────
// Case A: 구방식 — 화면이 먼저 뜨고, 이후 데이터를 가져오는 방식
//
// 화면 그리기 순서:
//   1번째 그리기 → 데이터 없음 → legacyHadEmptyState = true → 빈 화면 반환
//   useEffect 실행 → 데이터 도착 → setProject(found)
//   2번째 그리기 → 데이터 있음 → 완성된 화면 반환
// ─────────────────────────────────────────────────────────────────────────────
let legacyRenderCount = 0;
let legacyHadEmptyState = false;

const LegacyProjectPage = ({ id }: { id: string }) => {
  legacyRenderCount++;
  const [project, setProject] = useState<IProject | null>(null);

  // 렌더링 시점에 데이터가 없으면 플래그 기록 (워터폴의 증거)
  if (!project) legacyHadEmptyState = true;

  useEffect(() => {
    const found = (projectsData as IProject[]).find((p) => p.id === id);
    setProject(found ?? null);
  }, [id]);

  if (!project) {
    return <p data-testid="legacy-empty">데이터 없음 (로딩 중...)</p>;
  }

  return <p data-testid="legacy-content">{project.name}</p>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Case B: 현재방식 — 데이터를 먼저 준비하고, 완성된 상태로 화면을 그리는 방식
//
// 화면 그리기 순서:
//   페이지 이동 단계에서 loader 실행 → 데이터 준비 완료
//   1번째 그리기 → 이미 데이터 있음 → 완성된 화면 반환
//                  loaderAlwaysHadData = true 유지 (빈 화면 없음)
// ─────────────────────────────────────────────────────────────────────────────
let loaderRenderCount = 0;
let loaderAlwaysHadData = true;

const LoaderProjectPage = () => {
  loaderRenderCount++;
  const project = useLoaderData() as IProject | null;

  // 렌더링 시점에 데이터가 없었다면 false로 반전 (반증 추적)
  if (!project) loaderAlwaysHadData = false;

  if (!project) {
    return <p data-testid="loader-empty">데이터 없음 (로딩 중...)</p>;
  }

  return <p data-testid="loader-content">{project.name}</p>;
};

const testRoutes = [
  {
    path: '/project/:id',
    loader: async ({ params }: LoaderFunctionArgs) => {
      const project = (projectsData as IProject[]).find((p) => p.id === params.id);
      if (!project) throw new Response('Not Found', { status: 404 });
      return project;
    },
    element: <LoaderProjectPage />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 비교 통합 테스트
// ─────────────────────────────────────────────────────────────────────────────
describe('Challenge 2: "화면 먼저, 데이터 나중" vs "데이터 먼저, 화면 나중" 비교', () => {
  beforeEach(() => {
    legacyRenderCount = 0;
    legacyHadEmptyState = false;
    loaderRenderCount = 0;
    loaderAlwaysHadData = true;
  });

  // ────────────────────────────────────────────────────────────────────────
  // Case A: Legacy useEffect 방식
  // ────────────────────────────────────────────────────────────────────────
  describe('Case A (구방식 · Declarative Mode): 화면 먼저 뜨고, 데이터는 나중에 채워진다', () => {
    it('화면을 그리는 도중 데이터가 없는 순간이 반드시 존재한다', async () => {
      render(<LegacyProjectPage id={TARGET_ID} />);

      // RTL은 act()로 effects를 즉시 실행하므로 render() 반환 후엔 이미 최종 상태다.
      // 하지만 화면을 그리는 과정에서 데이터가 없었던 순간이 있었음을 플래그로 증명한다.
      await waitFor(() => screen.getByTestId('legacy-content'));

      expect(legacyHadEmptyState).toBe(true);
    });

    it('데이터가 도착한 뒤 화면을 다시 그려서 최종적으로 데이터가 표시된다', async () => {
      render(<LegacyProjectPage id={TARGET_ID} />);

      await waitFor(() => {
        expect(screen.getByTestId('legacy-content')).toBeInTheDocument();
      });

      expect(screen.getByTestId('legacy-content')).toHaveTextContent(TARGET_NAME);
      expect(screen.queryByTestId('legacy-empty')).not.toBeInTheDocument();
    });

    it('화면을 최소 2번 그린다 (빈 화면 1번 + 데이터 채운 화면 1번)', async () => {
      render(<LegacyProjectPage id={TARGET_ID} />);
      await waitFor(() => screen.getByTestId('legacy-content'));

      expect(legacyRenderCount).toBeGreaterThanOrEqual(2);
    });
  });

  // ────────────────────────────────────────────────────────────────────────
  // Case B: React Router Loader 방식
  // ────────────────────────────────────────────────────────────────────────
  describe('Case B (현재방식 · Data Mode): 데이터를 먼저 준비하고, 완성된 화면을 한 번에 그린다', () => {
    it('화면을 그리는 동안 단 한 순간도 데이터가 없는 상태가 없다', async () => {
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/project/${TARGET_ID}`],
      });

      render(<RouterProvider router={router} />);

      await waitFor(() => screen.getByTestId('loader-content'));

      // 화면을 그릴 때마다 항상 데이터가 있었음을 증명
      expect(loaderAlwaysHadData).toBe(true);
    });

    it('빈 화면이 단 한 번도 나타나지 않는다', async () => {
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/project/${TARGET_ID}`],
      });

      render(<RouterProvider router={router} />);

      await waitFor(() => screen.getByTestId('loader-content'));

      expect(screen.getByTestId('loader-content')).toHaveTextContent(TARGET_NAME);
      expect(screen.queryByTestId('loader-empty')).not.toBeInTheDocument();
    });

    it('화면을 딱 1번만 그린다 (처음부터 완성된 화면)', async () => {
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/project/${TARGET_ID}`],
      });

      render(<RouterProvider router={router} />);

      await waitFor(() => screen.getByTestId('loader-content'));

      // 데이터를 채우기 위한 추가 그리기가 발생하지 않음
      expect(loaderRenderCount).toBe(1);
    });
  });

  // ────────────────────────────────────────────────────────────────────────
  // 두 방식 렌더링 횟수 직접 비교
  // ────────────────────────────────────────────────────────────────────────
  describe('화면 그리기 횟수 비교', () => {
    it('현재방식(1번)이 구방식(2번 이상)보다 화면을 적게 그린다', async () => {
      // Case A 측정
      render(<LegacyProjectPage id={TARGET_ID} />);
      await waitFor(() => screen.getByTestId('legacy-content'));
      const caseARenderCount = legacyRenderCount;

      // Case B 측정
      loaderRenderCount = 0;
      const router = createMemoryRouter(testRoutes, {
        initialEntries: [`/project/${TARGET_ID}`],
      });
      render(<RouterProvider router={router} />);
      await waitFor(() => screen.getByTestId('loader-content'));
      const caseBRenderCount = loaderRenderCount;

      // 구방식: 빈 화면 1번 + 데이터 화면 1번 = 2번 이상
      // 현재방식: 완성된 화면 1번
      expect(caseBRenderCount).toBeLessThan(caseARenderCount);
    });
  });
});
