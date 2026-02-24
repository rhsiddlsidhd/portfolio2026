export declare function createStateContext<State, InitialValue>(useValue: (initialValue: InitialValue) => State): readonly [({ initialValue, children, }: {
    initialValue: InitialValue;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element, () => NonNullable<State>];
