import { LOADER_START, LOADER_STOP } from "../types";

const initialState = {
  active: false,
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_START:
      return {
        ...state,
        active: true,
      };
    case LOADER_STOP:
      return {
        ...state,
        active: false,
      };
    default:
      return state;
  }
};
