import React from "react";
import type { IntersectionOptions } from "react-intersection-observer";
type ScrollRevealRenderProps = {
    inView: boolean;
    onLoad: () => void;
};
type ScrollRevealProps = {
    children: React.ReactNode | ((props: ScrollRevealRenderProps) => React.ReactNode);
    waitForImg?: boolean;
    delay?: number;
    options?: IntersectionOptions;
};
declare const ScrollReveal: ({ children, waitForImg, delay, options, }: ScrollRevealProps) => import("react/jsx-runtime").JSX.Element;
export default ScrollReveal;
