import { Separator } from "@/components/atoms/separator";
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  className?: string;
  
}

/**
 * 섹션 하단(또는 상단)에 배치되어 영역을 구분하는 은은한 그라데이션 분리선입니다.
 * Tailwind v4의 bg-linear-to-r 문법을 사용하여 양 끝이 투명하게 페이드됩니다.
 */
export function SectionSeparator({ 
  className, 
   
}: SectionSeparatorProps) {
  return (
    <Separator
      className={cn(
        "absolute bottom-0 left-0 w-full h-px border-none bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent",
        
        className
      )}
    />
  );
}
