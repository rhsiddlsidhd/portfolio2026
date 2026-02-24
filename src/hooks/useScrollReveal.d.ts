import { type IntersectionOptions } from "react-intersection-observer";
declare const useScrollReveal: (options?: IntersectionOptions) => {
    ref: (node?: Element | null) => void;
    inView: boolean;
};
export default useScrollReveal;
