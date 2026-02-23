import { useCallback, useState } from "react";
import { createStateContext } from "./createStateContext";

type ImgLoadState = {
  isLoaded: boolean;
  inView: boolean;
  onLoad: () => void;
  setInView: (inView: boolean) => void;
};

const useImgLoadValue = (initialLoaded: boolean): ImgLoadState => {
  const [isLoaded, setIsLoaded] = useState<boolean>(initialLoaded);
  const [inView, setInView] = useState<boolean>(false);

  const onLoad = useCallback(() => setIsLoaded(true), []);
  const handleInView = useCallback((val: boolean) => setInView(val), []);

  return { isLoaded, inView, onLoad, setInView: handleInView };
};

const [ImgLoadProvider, useImaged] = createStateContext(useImgLoadValue);

export { ImgLoadProvider, useImaged };
