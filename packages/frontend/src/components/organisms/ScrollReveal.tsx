import { ImgLoadProvider, useImaged } from "@/context/imgLoad.context";
import useScrollReveal from "@/hooks/useScrollReveal";
import clsx from "clsx";
import React, { useEffect } from "react";
import type { IntersectionOptions } from "react-intersection-observer";

type ScrollRevealProps = {
  children: React.ReactNode;
  requiredImg?: boolean;
  delay?: number;
  options?: IntersectionOptions;
};

const ScrollReveal = ({
  children,
  requiredImg = false,
  delay = 0,
  options,
}: ScrollRevealProps) => {
  return (
    <ImgLoadProvider initialValue={!requiredImg}>
      <ScrollRevealContent delay={delay} options={options}>
        {children}
      </ScrollRevealContent>
    </ImgLoadProvider>
  );
};

const ScrollRevealContent = ({
  children,
  delay = 0,
  options,
}: Omit<ScrollRevealProps, "requiredImg">) => {
  const { isLoaded, setInView } = useImaged();
  const { ref, inView } = useScrollReveal(options);

  useEffect(() => {
    if (inView) {
      setInView(true);
    }
  }, [inView, setInView]);

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
      {children}
    </div>
  );
};

export default ScrollReveal;
