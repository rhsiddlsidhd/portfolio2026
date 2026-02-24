import { useState, useEffect } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: 640px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // 초기 상태 설정
    setIsMobile(mediaQuery.matches);

    // 리스너 등록
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { isMobile };
};

export default useMobile;
