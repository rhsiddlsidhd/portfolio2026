import { Button } from "../atoms/button";
import type { JSX } from "react";

export interface IHighlightItem {
  word: string;
  onClick?: () => void;
}

interface HighlightedTextProps {
  text: string;
  highlights: IHighlightItem[];
  className?: string;
}

/**
 * 전달받은 text에서 highlights 객체 배열의 word를 찾아 강조하고,
 * 각 word에 매칭되는 onClick 이벤트를 실행하는 컴포넌트
 */
export function HighlightedText({
  text,
  highlights,
  className,
}: HighlightedTextProps): JSX.Element {
  if (!highlights.length) return <span className={className}>{text}</span>;

  // 강조할 단어들만 추출하여 정규식 생성
  const words = highlights.map((h) => h.word);
  const regex = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // 현재 part가 하이라이트 대상인지 확인
        const match = highlights.find(
          (h) => h.word.toLowerCase() === part.toLowerCase()
        );

        if (match) {
          return (
            <Button
              key={i}
              variant="ghost"
              size="xs"
              onClick={match.onClick}
              className="text-chart-2 hover:bg-chart-2/10 text-md h-auto rounded-sm p-2 mr-0.5 font-semibold transition-colors  focus-visible:ring-chart-2/50"
            >
              {part}
            </Button>
          );
        }
        return part;
      })}
    </span>
  );
}
