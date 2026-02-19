import { SkillBadge } from "@/components/molecules/SkillBadge";
import { Separator } from "@/components/atoms/separator";

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

export function SkillsGrid({
  skills,
  groupByCategory = true,
  className,
}: SkillsGridProps) {
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

  const categories = Object.keys(groupedSkills).sort();

  return (
    <div className={className}>
      <div className="space-y-8">
        {categories.map((category, index) => (
          <div key={category}>
            {/* Category Header */}
            <div className="mb-4">
              <h3 className="text-foreground text-lg font-semibold">
                {category}
              </h3>
              <Separator className="mt-2" />
            </div>

            {/* Skills in this category */}
            <div className="flex flex-wrap gap-2">
              {groupedSkills[category].map((skill) => (
                <SkillBadge key={skill.id} skill={skill} showTooltip={false} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
