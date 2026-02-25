import { useMemo } from "react";
import { useSkillsFilter } from "@/context/skillsFilter.context";
import type { ISkill } from "@/types/skill";
import { CATEGORY_ORDER } from "@/constants/skill";

/**
 * 스킬 목록을 카테고리별로 그룹화하고 현재 선택된 카테고리의 스킬을 관리하는 훅
 */
export function useSkills(skills: ISkill[]) {
  const [state, dispatch] = useSkillsFilter();

  // 카테고리별로 그룹핑 및 정렬된 카테고리 목록 생성
  const { groupedSkills, categories } = useMemo(() => {
    const grouped = skills.reduce(
      (acc, skill) => {
        const category = skill.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      },
      {} as Record<string, ISkill[]>,
    );

    const sortedCategories = Object.keys(grouped).sort((a, b) => {
      const order:readonly string[] = CATEGORY_ORDER ;
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return { groupedSkills: grouped, categories: sortedCategories };
  }, [skills]);

  const currentSkills = useMemo(() => {
    return groupedSkills[state.selectedCategory] || [];
  }, [groupedSkills, state.selectedCategory]);

  const selectCategory = (category: string) => {
    dispatch({ type: "SELECT_CATEGORY", payload: category });
  };

  return {
    categories,
    currentSkills,
    selectedCategory: state.selectedCategory,
    selectCategory,
  };
}
