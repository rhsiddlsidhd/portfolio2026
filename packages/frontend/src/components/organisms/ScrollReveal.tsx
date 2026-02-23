import { RevealImgProvider, useRevealImg } from "@/context/revealImg.context";
import useScrollReveal from "@/hooks/useScrollReveal";
import clsx from "clsx";
import React from "react";
import type { IntersectionOptions } from "react-intersection-observer";

type ScrollRevealRenderProps = { inView: boolean; onLoad: () => void };

type ScrollRevealProps = {
  children:
    | React.ReactNode
    | ((props: ScrollRevealRenderProps) => React.ReactNode);
  waitForImg?: boolean;
  delay?: number;
  options?: IntersectionOptions;
};

const ScrollReveal = ({
  children,
  waitForImg = false,
  delay = 0,
  options,
}: ScrollRevealProps) => {
  return (
    <RevealImgProvider initialValue={!waitForImg}>
      <ScrollRevealInner delay={delay} options={options}>
        {children}
      </ScrollRevealInner>
    </RevealImgProvider>
  );
};

const ScrollRevealInner = ({
  children,
  delay = 0,
  options,
}: Omit<ScrollRevealProps, "waitForImg">) => {
  const { isLoaded, onLoad } = useRevealImg();
  const { ref, inView } = useScrollReveal(options);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx(
        "relative transition-all duration-700 ease-out",
        inView && isLoaded
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0",
      )}
    >
      {typeof children === "function"
        ? children({ inView, onLoad })
        : children}
    </div>
  );
};

export default ScrollReveal;
