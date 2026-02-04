// src/components/molecules/AnimationSection.tsx
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimationSectionProps {
  id: string; // 섹션 ID (스크롤 내비게이션용)
  children: React.ReactNode;
  className?: string;
  triggerOnce?: boolean; // 한 번만 애니메이션을 실행할지 여부
  threshold?: number; // 뷰포트 가시성 임계값 (0.0 ~ 1.0)
  animationClass?: string; // 적용할 기본 애니메이션 Tailwind 클래스 (예: animate-fade-in-up)
  animationDuration?: string; // 애니메이션 지속 시간 (예: duration-700)
}

const AnimationSection: React.FC<AnimationSectionProps> = ({
  id,
  children,
  className,
  triggerOnce = true,
  threshold = 0.1,
  animationClass = 'animate-fade-in-up', // 기본 애니메이션
  animationDuration = 'duration-700', // 기본 지속 시간
}) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  // 초기에는 투명하고 아래로 이동된 상태, inView가 되면 애니메이션 클래스 적용
  const initialClass = 'opacity-0 translate-y-4';
  const finalClass = inView ? animationClass : initialClass;

  return (
    <section id={id} ref={ref} className={`${className || ''} transition-all ${animationDuration} ${finalClass}`}>
      {children}
    </section>
  );
};

export default AnimationSection;
