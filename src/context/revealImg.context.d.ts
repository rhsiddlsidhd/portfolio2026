type RevealImgState = {
    isLoaded: boolean;
    onLoad: () => void;
};
declare const RevealImgProvider: ({ initialValue, children, }: {
    initialValue: boolean;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element, useRevealImg: () => RevealImgState;
export { RevealImgProvider, useRevealImg };
