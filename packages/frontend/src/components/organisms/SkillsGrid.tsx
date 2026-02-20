"use client";

import { SkillBadge } from "@/components/molecules/SkillBadge";
import { Button } from "@/components/atoms/button";
import { useSkillsFilter } from "@/context/skillsFilter.context";

interface Skill {
  id: string;
  name: string;
  category: string;
  thumbnailUrl?: string | null;
}

interface SkillsGridProps {
  skills: Skill[];
  groupByCategory?: boolean;
  className?: string;
}

const categoryOrder = ["language", "frontend", "backend", "tool"];

const categoryLabels: Record<string, string> = {
  language: "Language",
  frontend: "Frontend",
  backend: "Backend",
  tool: "Tool",
};

export function SkillsGrid({
  skills,
  groupByCategory = true,
  className,
}: SkillsGridProps) {
  const [state, dispatch] = useSkillsFilter();

  if (!groupByCategory) {
    // 카테고리 구분 없이 전체 스킬을 그리드로 표시
    return (
      <div className={className}>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    );
  }

  // 카테고리별로 그룹핑
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  const categories = Object.keys(groupedSkills).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const currentSkills = groupedSkills[state.selectedCategory] || [];

  return (
    <div className={className}>
      {/* Mobile: 가로 스크롤 탭 */}
      <div className="mb-6 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                state.selectedCategory === category ? "default" : "secondary"
              }
              size="sm"
              onClick={() =>
                dispatch({ type: "SELECT_CATEGORY", payload: category })
              }
              className="whitespace-nowrap"
            >
              {categoryLabels[category] || category}
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop: 좌우 레이아웃 */}
      <div className="hidden md:flex md:gap-8">
        {/* 좌측 20%: 세로 탭 */}
        <div className="w-1/5 space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                state.selectedCategory === category ? "default" : "secondary"
              }
              size="default"
              onClick={() =>
                dispatch({ type: "SELECT_CATEGORY", payload: category })
              }
              className="w-full justify-start"
            >
              {categoryLabels[category] || category}
            </Button>
          ))}
        </div>

        {/* 우측 80%: 스킬 그리드 */}
        <div className="w-4/5">
          <div
            key={state.selectedCategory}
            className="animate-fadeIn flex flex-wrap gap-2"
          >
            {currentSkills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} showTooltip={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: 스킬 그리드 (탭 아래) */}
      <div className="md:hidden">
        <div
          key={state.selectedCategory}
          className="animate-fadeIn flex flex-wrap gap-2"
        >
          {currentSkills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} showTooltip={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
