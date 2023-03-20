import { TRENDING_BOOKS } from "../types";
const initialState = {
  trendingBooks: null,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRENDING_BOOKS:
      return {
        ...state,
        trendingBooks: action.payload.trendingBooks,
      };
    default:
      return state;
  }
};
