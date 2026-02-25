import { STAGGER_VISIBLE_THRESHOLD } from "@/constants/ui";
import {
  useInView,
  type IntersectionOptions,
} from "react-intersection-observer";

const useScrollReveal = (options?: IntersectionOptions) => {
  const { ref, inView } = useInView({
    threshold: STAGGER_VISIBLE_THRESHOLD,
    triggerOnce: true,
    ...options,
  });

  return { ref, inView };
};

export default useScrollReveal;
