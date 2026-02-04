// src/components/sections/SkillsSection.tsx
import React, { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer'; // useInView 제거
import { getSkills } from '@/api/projectAPI'; // 기술 데이터를 가져올 API 함수
import type { Skill } from '@/types/skill'; // 기술 타입
import type { ApiError } from '@/types/api'; // ApiError import 추가
import Skeleton from '@/components/atoms/skeleton'; // 스켈레톤 컴포넌트
import { SECTION_IDS } from '@/constants/routes'; // 섹션 ID
import { Card } from '@/components/atoms/card'; // Card 컴포넌트 사용
import AnimationSection from '@/components/molecules/AnimationSection'; // AnimationSection import

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        setError((err as ApiError).message || 'Failed to fetch skills data');
      } finally {
        setLoading(false);
      }
    };
    fetchSkillsData();
  }, []);

  if (loading) {
    return (
      <AnimationSection id={SECTION_IDS.SKILLS} className="container mx-auto p-8"> {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">
          <Skeleton className="h-8 w-1/4" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          ))}
        </div>
      </AnimationSection>
    );
  }

  if (error) {
    return (
      <AnimationSection id={SECTION_IDS.SKILLS} className="container mx-auto p-8"> {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">My Skills</h2>
        <p className="text-red-500">Error: {error}</p>
      </AnimationSection>
    );
  }

  // 카테고리별로 기술을 그룹화
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <AnimationSection id={SECTION_IDS.SKILLS} className="container mx-auto p-8"> {/* AnimationSection으로 감쌈 */}
      <h2 className="text-3xl font-bold mb-6">My Skills</h2>
      {Object.entries(groupedSkills).map(([category, skillList]) => (
        <div key={category} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillList.map((skill) => (
              <Card key={skill.id} className="p-6">
                <div className="flex items-center mb-4">
                  {/* TODO: 실제 아이콘 컴포넌트 렌더링 */}
                  <span className="text-2xl mr-4">{skill.icon ? `[${skill.icon}]` : ''}</span>
                  <h4 className="text-xl font-medium">{skill.name}</h4>
                </div>
                <p className="text-muted-foreground">{skill.description}</p>
                {/* TODO: Proficiency 시각화 (예: 별점, 바) */}
                <p className="text-sm mt-2">Proficiency: {skill.proficiency}/5</p>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </AnimationSection>
  );
};

export default SkillsSection;
