import { useCallback, useState } from "react";
import { createStateContext } from "./createStateContext";

type RevealImgState = {
  isLoaded: boolean;
  onLoad: () => void;
};

const useRevealImgValue = (initialLoaded: boolean): RevealImgState => {
  const [isLoaded, setIsLoaded] = useState<boolean>(initialLoaded);

  const onLoad = useCallback(() => setIsLoaded(true), []);

  return { isLoaded, onLoad };
};

const [RevealImgProvider, useRevealImg] = createStateContext(useRevealImgValue);

export { RevealImgProvider, useRevealImg };
