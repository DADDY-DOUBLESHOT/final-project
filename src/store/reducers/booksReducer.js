import {
  GENRE_BOOKS,
  POPULAR_BOOKS,
  RECOM_BOOKS,
  TRENDING_BOOKS,
  WISHLIST,
  UPLOADED_BOOKS
} from "../types";
const initialState = {
  trendingBooks: [],
  popularBooks: [],
  genreBooks: [],
  wishlist: [],
  recomBooks: [],
  uploadedBooks:[],
};

export const booksReducer = (state = initialState, action) => {
  console.log("action", action.payload);
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
    case UPLOADED_BOOKS:
      return{
        ...state,
        uploadedBooks: action.payload.uploadedBooks,
      }
    default:
      return state;
  }
};
