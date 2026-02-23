import {
  useInView,
  type IntersectionOptions,
} from "react-intersection-observer";

const useScrollReveal = (options?: IntersectionOptions) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    ...options,
  });

  return { ref, inView };
};

export default useScrollReveal;
