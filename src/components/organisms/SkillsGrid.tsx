import { SkillBadge } from "@/components/molecules/SkillBadge";
import { Button } from "@/components/atoms/button";
import { useSkills } from "@/hooks/useSkills";
import { CATEGORY_LABELS, SKILL_STAGGER_DELAY } from "@/constants/skill";
import type { ISkill } from "@/types/skill";
import Reveal from "./Reveal";

interface SkillsGridProps {
  skills: ISkill[];
  groupByCategory?: boolean;
  className?: string;
}

export function SkillsGrid({
  skills,
  groupByCategory = true,
  className,
}: SkillsGridProps) {
  const { categories, currentSkills, selectedCategory, selectCategory } =
    useSkills(skills);

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

  return (
    <div className={className}>
      {/* Mobile: 가로 스크롤 탭 */}
      <div className="mb-6 md:hidden">
        <div className="scroll-hide flex gap-2 overflow-x-auto pb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => selectCategory(category)}
              className="whitespace-nowrap"
            >
              {CATEGORY_LABELS[category] || category}
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
              variant={selectedCategory === category ? "default" : "secondary"}
              size="default"
              onClick={() => selectCategory(category)}
              className="w-full justify-start"
            >
              {CATEGORY_LABELS[category] || category}
            </Button>
          ))}
        </div>

        {/* 우측 80%: 스킬 그리드 */}
        <div className="w-4/5">
          <div
            key={selectedCategory}
            className="animate-fadeIn flex flex-wrap gap-2"
          >
            {currentSkills.map((skill, index) => (
              <Reveal key={skill.id} delay={index * SKILL_STAGGER_DELAY}>
                <SkillBadge skill={skill} showTooltip={true} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: 스킬 그리드 (탭 아래) */}
      <div className="md:hidden">
        <div
          key={selectedCategory}
          className="animate-fadeIn flex flex-wrap gap-2"
        >
          {currentSkills.map((skill, index) => (
            <Reveal key={skill.id} delay={index * SKILL_STAGGER_DELAY}>
              <SkillBadge skill={skill} showTooltip={true} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
