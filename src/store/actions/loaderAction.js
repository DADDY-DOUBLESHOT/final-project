import { LOADER_START, LOADER_STOP } from "../types";

export const loaderStart = () => (dispatch) => {
  dispatch({
    type: LOADER_START,
  });
};
export const loaderStop = () => (dispatch) => {
  dispatch({
    type: LOADER_STOP,
  });
};
