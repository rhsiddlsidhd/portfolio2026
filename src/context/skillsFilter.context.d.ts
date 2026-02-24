interface SkillsFilterState {
    selectedCategory: string;
}
type SkillsFilterAction = {
    type: "SELECT_CATEGORY";
    payload: string;
} | {
    type: "CLEAR_FILTER";
};
declare const SkillsFilterProvider: ({ initialValue, children, }: {
    initialValue: unknown;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element, useSkillsFilter: () => [SkillsFilterState, import("react").ActionDispatch<[action: SkillsFilterAction]>];
export { SkillsFilterProvider, useSkillsFilter };
