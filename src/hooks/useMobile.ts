import { useSyncExternalStore } from "react";

const useMobile = () => {
  const isMobile = useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(max-width: 640px)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(max-width: 640px)").matches,
    () => false // SSR fallback
  );

  return { isMobile };
};

export default useMobile;
