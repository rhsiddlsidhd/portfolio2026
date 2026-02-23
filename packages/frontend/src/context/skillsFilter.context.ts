import { useReducer } from "react";
import { createStateContext } from "./createStateContext";

// 1. State
interface SkillsFilterState {
  selectedCategory: string;
}

// 2. Initial State
const initialState: SkillsFilterState = {
  selectedCategory: "language",
};

// 3. Actions
type SkillsFilterAction =
  | { type: "SELECT_CATEGORY"; payload: string }
  | { type: "CLEAR_FILTER" };

// 4. Reducer
const skillsFilterReducer = (
  state: SkillsFilterState,
  action: SkillsFilterAction,
): SkillsFilterState => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      // If the same category is clicked again, clear the filter. Otherwise, select the new one.
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        selectedCategory: "",
      };
    default:
      return state;
  }
};

// Custom hook that bundles the reducer
const useSkillsFilterReducer = () => {
  return useReducer(skillsFilterReducer, initialState);
};

// 5. Create Context
const [SkillsFilterProvider, useSkillsFilter] =
  createStateContext(useSkillsFilterReducer);

export { SkillsFilterProvider, useSkillsFilter };
