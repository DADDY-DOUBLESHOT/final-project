import {SET_BOOK_DETAILS } from "../types";
const initialState = {
    title: '',
    author: '',
    rating: '',
    review: '',
    synopsis: '',
    bookImage: '',
  };
  
  export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_BOOK_DETAILS:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };