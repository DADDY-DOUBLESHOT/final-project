import { GENRE_BOOKS, POPULAR_BOOKS, RECOM_BOOKS, TRENDING_BOOKS, WISHLIST, UPLOADED_BOOKS, AUTHOR_BOOKS, CONTINUE_BOOK } from "../types";
const initialState = {
  trendingBooks: [],
  popularBooks: [],
  genreBooks: [],
  wishlist: [],
  recomBooks: [],
  uploadedBooks: [],
  authorBooks: [],
  continueBook: null,
};

export const booksReducer = (state = initialState, action) => {
  // console.log("action", action.payload);
  switch (action.type) {
    case TRENDING_BOOKS:
      return {
        ...state,
        trendingBooks: action.payload.trendingBooks,
      };
    case POPULAR_BOOKS:
      return {
        ...state,
        popularBooks: action.payload.popularBooks,
      };
    case GENRE_BOOKS:
      return {
        ...state,
        genreBooks: action.payload.genreBooks,
      };
    case WISHLIST:
      return {
        ...state,
        wishlist: action.payload.wishlist,
      };
    case RECOM_BOOKS:
      return {
        ...state,
        recomBooks: action.payload.recomBooks,
      };
    case AUTHOR_BOOKS:
      return {
        ...state,
        authorBooks: action.payload.authorBooks,
      };
    case CONTINUE_BOOK:
      return {
        ...state,
        continueBook: action.payload.continueBook,
      };
    default:
      return state;
  }
};
